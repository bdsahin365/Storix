import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Shop } from './shops.entity';
import { User, UserRole } from '../users/users.entity';
import { AuditLog, AuditActionType } from '../audit/audit-log.entity';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(Shop)
        private shopsRepository: Repository<Shop>,
        private dataSource: DataSource,
    ) { }

    async create(createShopDto: CreateShopDto, supabaseUserId: string): Promise<{ success: boolean; shop: Shop }> {
        return this.dataSource.transaction(async (manager) => {
            // 1. Find or Create the User
            let user = await manager.findOne(User, { where: { supabase_uid: supabaseUserId }, relations: ['shop'] });

            if (!user) {
                // Auto-create user during onboarding
                user = manager.create(User, {
                    supabase_uid: supabaseUserId,
                    phone: createShopDto.phone,
                    full_name: createShopDto.owner_name,
                    role: UserRole.OWNER,
                });
                user = await manager.save(user);
            }

            if (user.shop) {
                throw new BadRequestException('User already belongs to a shop.');
            }

            // 2. Create Shop
            const shop = manager.create(Shop, {
                name: createShopDto.name,
                address: createShopDto.address,
                phone: createShopDto.phone,
                store_type: createShopDto.store_type,
                settings: { currency: 'BDT' },
            });
            const savedShop = await manager.save(shop);

            // 3. Link User as Owner
            user.shop = savedShop;
            user.role = UserRole.OWNER;
            user.full_name = createShopDto.owner_name;
            await manager.save(user);

            // 4. Create Audit Log
            const auditLog = manager.create(AuditLog, {
                action_by: user.id,
                action_type: AuditActionType.STORE_CREATED,
                reason: 'Store creation during onboarding',
                target_resource: `shop:${savedShop.id}`,
                details: {
                    shop_name: savedShop.name,
                    store_type: savedShop.store_type,
                    owner_name: user.full_name,
                },
            });
            await manager.save(auditLog);

            return { success: true, shop: savedShop };
        });
    }

    async findMyShop(supabaseUserId: string): Promise<Shop | null> {
        const user = await this.dataSource.getRepository(User).findOne({
            where: { supabase_uid: supabaseUserId },
            relations: ['shop']
        });
        if (!user || !user.shop) return null;
        return user.shop;
    }

    async getShopAndUser(supabaseUserId: string): Promise<{ shop: Shop; user: User } | null> {
        const user = await this.dataSource.getRepository(User).findOne({
            where: { supabase_uid: supabaseUserId },
            relations: ['shop']
        });
        if (!user || !user.shop) return null;
        return { shop: user.shop, user };
    }
}

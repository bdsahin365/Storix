import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Shop } from './shops.entity';
import { User, UserRole } from '../users/users.entity';

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(Shop)
        private shopsRepository: Repository<Shop>,
        private dataSource: DataSource,
    ) { }

    async create(createShopDto: any, supabaseUserId: string): Promise<Shop> {
        return this.dataSource.transaction(async (manager) => {
            // 1. Find the User
            const user = await manager.findOne(User, { where: { supabase_uid: supabaseUserId }, relations: ['shop'] });

            if (!user) {
                throw new BadRequestException('User not found. Please sync user first.');
            }
            if (user.shop) {
                throw new BadRequestException('User already belongs to a shop.');
            }

            // 2. Create Shop
            const shop = manager.create(Shop, {
                name: createShopDto.name,
                settings: createShopDto.settings || { currency: 'BDT' },
                address: createShopDto.address,
                phone: createShopDto.phone,
            });
            const savedShop = await manager.save(shop);

            // 3. Link User as Owner
            user.shop = savedShop;
            user.role = UserRole.OWNER;
            await manager.save(user);

            return savedShop;
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
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Shop } from './shops.entity';
import { ShopPreference } from './entities/shop-preferences.entity';
import { ShopMember } from './entities/shop-members.entity';
import { AuditLog } from '../audit/audit-log.entity';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, ShopPreference, ShopMember, AuditLog]),
        ConfigModule,
    ],
    controllers: [ShopsController],
    providers: [ShopsService],
    exports: [ShopsService, TypeOrmModule],
})
export class ShopsModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { CustomersModule } from './customers/customers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { AuditModule } from './audit/audit.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // TODO: Disable in production
        ssl: {
          rejectUnauthorized: false, // Required for Pooler
        },
      }),
    }),
    AuthModule,
    UsersModule,
    ShopsModule,
    CustomersModule,
    TransactionsModule,
    SuperadminModule,
    AuditModule,
    ProductsModule,
    InventoryModule,
    SalesModule,
  ],
})
export class AppModule { }

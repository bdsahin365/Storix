import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        forwardRef(() => TransactionsModule),
        UsersModule,
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
    exports: [CustomersService, TypeOrmModule],
})
export class CustomersModule { }

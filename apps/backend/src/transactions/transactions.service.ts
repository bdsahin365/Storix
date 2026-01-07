import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { Transaction, TransactionType } from './transactions.entity';
import { Customer } from '../customers/customers.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        private dataSource: DataSource,
    ) { }

    // 1. Standard Create (Starts its own transaction)
    async create(createDto: any, shopId: string): Promise<Transaction> {
        return this.dataSource.transaction(async (manager) => {
            return this.createWithManager(createDto, shopId, manager);
        });
    }

    // 2. Transaction-Aware Create (Joins existing transaction)
    async createWithManager(createDto: any, shopId: string, manager: EntityManager): Promise<Transaction> {
        const { type, amount, customerId, note, metadata } = createDto;

        // 1. Validate Customer
        const customer = await manager.findOne(Customer, { where: { id: customerId, shop_id: shopId } });
        if (!customer && type !== TransactionType.EXPENSE) {
            if (customerId) throw new NotFoundException('Customer not found');
        }

        // 2. Create Transaction
        const transaction = manager.create(Transaction, {
            shop_id: shopId,
            customer_id: customerId,
            type,
            amount,
            note,
            metadata,
        });
        const savedTx = await manager.save(transaction);

        // 3. Update Cached Balance (Atomic Increment)
        if (customerId) {
            // SALE adds to balance (Due increases)
            // PAYMENT/RETURN subtracts (Due decreases)
            // EXPENSE (N/A usually)
            const sign = (type === TransactionType.SALE) ? 1 : -1;

            await manager.increment(
                Customer,
                { id: customerId },
                'cached_balance',
                amount * sign
            );
        }

        return savedTx;
    }

    async findByCustomer(customerId: string, shopId: string) {
        return this.transactionsRepository.find({
            where: { customer_id: customerId, shop_id: shopId },
            order: { created_at: 'DESC' },
        });
    }
}

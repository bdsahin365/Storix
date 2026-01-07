import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InventoryService } from '../inventory/inventory.service';
import { TransactionsService } from '../transactions/transactions.service'; // We need to refactor TransactionsService to accept Manager
import { SaleItem } from './sale-item.entity';
import { TransactionType } from '../transactions/transactions.entity';

@Injectable()
export class SalesService {
    constructor(
        private dataSource: DataSource,
        private inventoryService: InventoryService,
        // We can't easily injection TransactionsService if it's not designed for transactional reuse.
        // OPTION 1: Refactor TransactionsService methods to take optional `manager`.
        // OPTION 2: Re-implement the basic transaction creation here using repositories (Duplicate logic).
        // BEST PRACTICE: Refactor TransactionsService.
        private transactionsService: TransactionsService,
    ) { }

    async createSale(shopId: string, dto: { customerId: string; items: any[]; paidAmount: number }) {
        return this.dataSource.transaction(async (manager) => {
            const { customerId, items, paidAmount } = dto;

            // 1. Calculate Total Sale Amount
            let totalAmount = 0;
            for (const item of items) {
                const subtotal = item.quantity * item.price;
                totalAmount += subtotal;
            }

            // 2. Create Financial Transaction (SALE - Debit) via TransactionsService refactored or direct.
            // Let's assume we refactor TransactionsService.create to accept `manager`.
            // For now, I will use QueryRunner/Manager for direct access or I have to update TransactionsService.
            // Let's update `TransactionsService` in next step.
            // Placeholder:
            const saleTx = await this.transactionsService.createWithManager({
                type: TransactionType.SALE,
                amount: totalAmount,
                customerId: customerId,
                note: 'Sale', // TODO: Add items summary
                metadata: { itemsCount: items.length }
            }, shopId, manager);

            // 3. Process Items (Stock Out & SaleItem)
            for (const item of items) {
                // Stock Out
                await this.inventoryService.stockOut(shopId, item.productId, item.quantity, saleTx.id, manager);

                // Create SaleItem
                const saleItem = manager.create(SaleItem, {
                    transaction_id: saleTx.id,
                    product_id: item.productId,
                    quantity: item.quantity,
                    price_at_sale: item.price,
                });
                await manager.save(saleItem);
            }

            // 4. If Paid > 0, create Payment Transaction
            if (paidAmount > 0) {
                await this.transactionsService.createWithManager({
                    type: TransactionType.PAYMENT,
                    amount: paidAmount,
                    customerId: customerId, // Customer pays
                    note: 'Immediate Payment',
                }, shopId, manager);
            }

            return saleTx;
        });
    }
}

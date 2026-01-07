import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { InventoryTransaction, InventoryTransactionType, ReferenceType } from './inventory-transaction.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(InventoryTransaction)
        private inventoryRepository: Repository<InventoryTransaction>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private dataSource: DataSource,
    ) { }

    // 1. Stock In (Atomic)
    async stockIn(shopId: string, dto: { productId: string; quantity: number; buyPrice: number }, manager?: EntityManager) {
        const execute = async (em: EntityManager) => {
            const { productId, quantity, buyPrice } = dto;
            if (quantity <= 0) throw new BadRequestException('Quantity must be positive');

            // Update Product (Buy Price + Cached Stock)
            // We increment cached_stock to keep it consistent.
            await em.increment(Product, { id: productId, shop_id: shopId }, 'cached_stock', quantity);
            await em.update(Product, { id: productId, shop_id: shopId }, { buy_price: buyPrice });

            // Record Ledger Entry
            const tx = em.create(InventoryTransaction, {
                shop_id: shopId,
                product_id: productId,
                type: InventoryTransactionType.STOCK_IN,
                quantity: quantity,
                reference_type: ReferenceType.MANUAL, // Or PURCHASE if we had Purchase entity
                created_by: 'SYSTEM', // Better to pass user ID if available
            });
            await em.save(tx);
        };

        if (manager) {
            return execute(manager);
        } else {
            return this.dataSource.transaction(execute);
        }
    }

    // 2. Stock Out (Called by SalesService inside Transaction)
    async stockOut(shopId: string, productId: string, quantity: number, referenceId: string, manager: EntityManager) {
        if (quantity <= 0) throw new BadRequestException('Quantity must be positive');

        // Decrement Cached Stock
        await manager.decrement(Product, { id: productId, shop_id: shopId }, 'cached_stock', quantity);

        // Record Ledger Entry
        const tx = manager.create(InventoryTransaction, {
            shop_id: shopId,
            product_id: productId,
            type: InventoryTransactionType.STOCK_OUT,
            quantity: quantity,
            reference_type: ReferenceType.SALE,
            reference_id: referenceId,
        });
        await manager.save(tx);
    }
}

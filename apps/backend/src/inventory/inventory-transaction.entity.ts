import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Shop } from '../shops/shops.entity';
import { Product } from '../products/product.entity';
import { AuditLog } from '../audit/audit-log.entity';

export enum InventoryTransactionType {
    STOCK_IN = 'STOCK_IN',
    STOCK_OUT = 'STOCK_OUT',
    ADJUSTMENT = 'ADJUSTMENT',
    RETURN = 'RETURN',
}

export enum ReferenceType {
    SALE = 'SALE',
    PURCHASE = 'PURCHASE',
    MANUAL = 'MANUAL',
}

@Entity('inventory_transactions')
@Index(['shop_id', 'product_id'])
export class InventoryTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: InventoryTransactionType,
    })
    type: InventoryTransactionType;

    @Column({ type: 'int' })
    quantity: number; // Always positive. Logic determines sign based on type.

    @Column({
        type: 'enum',
        enum: ReferenceType,
    })
    reference_type: ReferenceType;

    @Column({ nullable: true })
    reference_id: string; // ID of Sale, Purchase, etc.

    @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    product_id: string;

    @ManyToOne(() => AuditLog, { nullable: true })
    @JoinColumn({ name: 'audit_log_id' })
    audit_log: AuditLog;

    @Column({ nullable: true })
    created_by: string; // User ID

    @CreateDateColumn()
    created_at: Date;
}

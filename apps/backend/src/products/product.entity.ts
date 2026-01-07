import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../shops/shops.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    buy_price: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    sell_price: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    cached_stock: number; // Derived from Inventory Ledger

    @Column({ type: 'int', default: 5 })
    low_stock_limit: number;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

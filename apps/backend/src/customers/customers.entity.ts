import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../shops/shops.entity';
// import { Transaction } from '../transactions/transactions.entity'; // Circular dependency, defined later

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    cached_balance: number; // Optimization: Sum of all transactions. Positive = Due, Negative = Advance

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

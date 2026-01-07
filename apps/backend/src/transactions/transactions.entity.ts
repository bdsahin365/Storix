import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Shop } from '../shops/shops.entity';
import { Customer } from '../customers/customers.entity';

export enum TransactionType {
    SALE = 'SALE',          // Debit (+) : Customer owes updated
    PAYMENT = 'PAYMENT',    // Credit (-) : Customer paid
    RETURN = 'RETURN',      // Credit (-) : Product returned
    EXPENSE = 'EXPENSE',    // N/A        : Shop expense (no customer usually)
}

@Entity('transactions')
@Index(['shop_id', 'created_at']) // For reporting
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'text', nullable: true })
    note: string;

    @ManyToOne(() => Shop, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @ManyToOne(() => Customer, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ nullable: true })
    customer_id: string;

    @Column({ type: 'jsonb', default: {} })
    metadata: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;
}

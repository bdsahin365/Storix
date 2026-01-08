import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('shops')
export class Shop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    store_type: string; // মুদি দোকান, ফার্মেসি, হার্ডওয়্যার, পাইকারি, অন্যান্য

    @Column({ type: 'jsonb', default: {} })
    settings: Record<string, any>; // Currency, Language, PrintHeader, etc.

    @OneToMany(() => User, (user) => user.shop)
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

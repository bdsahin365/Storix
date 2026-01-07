import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../shops/shops.entity';

export enum UserRole {
    SUPERADMIN = 'SUPERADMIN',
    OWNER = 'OWNER',
    STAFF = 'STAFF',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    supabase_uid: string;

    @Column({ nullable: true })
    full_name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STAFF,
    })
    role: UserRole;

    @ManyToOne(() => Shop, (shop) => shop.users, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column({ nullable: true })
    shop_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

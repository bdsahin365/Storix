import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Shop } from '../shops.entity';
// import { User } from '../../users/users.entity'; // Circular dependency risk, usually ID is enough unless we need relation

@Entity('shop_members')
export class ShopMember {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    shop_id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column()
    role: string; // OWNER / STAFF
}

import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../shops.entity';

@Entity('shop_preferences')
export class ShopPreference {
    @PrimaryColumn('uuid')
    shop_id: string;

    @OneToOne(() => Shop, (shop) => shop.preference, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column({ default: 'bn' })
    language: string;

    @Column({ default: 'DD/MM/YYYY' })
    date_format: string;

    @Column({ type: 'text', nullable: true })
    halkhata_header_text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

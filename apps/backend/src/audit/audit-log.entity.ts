import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true })
    shop_id: string;

    @Column({ type: 'uuid', nullable: true })
    user_id: string;

    @Column({ nullable: true })
    action: string;

    @Column({ type: 'text', nullable: true })
    entity: string;

    @Column({ type: 'jsonb', nullable: true })
    old_value: any;

    @Column({ type: 'jsonb', nullable: true })
    new_value: any;

    @CreateDateColumn()
    created_at: Date;
}


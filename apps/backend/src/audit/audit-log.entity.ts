import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum AuditActionType {
    SUPPORT = 'SUPPORT',
    MIGRATION = 'MIGRATION',
    SECURITY = 'SECURITY',
    OTHER = 'OTHER',
}

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index()
    action_by: string; // User UUID or 'SUPERADMIN'

    @Column({
        type: 'enum',
        enum: AuditActionType,
    })
    action_type: AuditActionType;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'jsonb', nullable: true })
    details: Record<string, any>; // Previous state, New state, etc.

    @Column({ nullable: true })
    target_resource: string; // e.g., 'shop:UUID' or 'transaction:UUID'

    @CreateDateColumn()
    created_at: Date;
}

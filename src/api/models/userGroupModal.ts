import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

interface PermissionData {
    name: string;
  }

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string ;

    @Column()
    description: string ;

    @Column({ type: 'json' })
    permission: PermissionData;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;
}
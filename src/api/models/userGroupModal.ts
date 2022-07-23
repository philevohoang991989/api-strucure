import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { User } from "./userModal";

interface PermissionData {
    id: number;
    name: string;
    description: string;
    group: string;
    action: string
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

    @OneToMany(()=> User, user => user.user_group)
    user: User

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}
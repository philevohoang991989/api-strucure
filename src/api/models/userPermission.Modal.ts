import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import {Permissions} from './permissionsModal'
import { User } from "./userModal";

@Entity()
export class UserPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Permissions, permission => permission.userpermission)
    @JoinColumn({name: "permission_id"})
    permission: Permissions ;

   @ManyToOne(()=> User, user=> user.userpermission)
   @JoinColumn({name: "user_id"})
   user: User

   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}
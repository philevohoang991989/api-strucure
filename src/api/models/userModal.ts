import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany,JoinColumn, ManyToOne} from "typeorm";
import { UserGroup } from "./userGroupModal";
import { UserPermission } from "./userPermission.Modal";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
     
    @ManyToOne(()=> UserGroup, user_group => user_group.user)
    @JoinColumn({name: "group_id"})
    user_group: UserGroup

    @Column()
    username: string ;

    @Column()
    password: string ;

    @Column()
    avatar: string

    @Column()
    fullname: string

    
    @Column()
    email: string

    @Column()
    status: string
   

    @OneToMany(()=> UserPermission, userPermission => userPermission.permission)
    userpermission: UserPermission

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    update_at: Date;

}
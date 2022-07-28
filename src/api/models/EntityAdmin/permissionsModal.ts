import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { UserPermission } from "./userPermission.Modal";

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  group: string;

  @Column()
  action: string;

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission_id
  )
  userpermission: UserPermission;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  update_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

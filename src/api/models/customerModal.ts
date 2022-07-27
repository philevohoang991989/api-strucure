import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from "typeorm";
  import { CustomerGroup } from "./customerGroupModal";
  import { CustomerAddress } from './customerAddressModal'
   
  @Entity()
  export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cus_code: string;

    @ManyToOne(() => CustomerGroup, (customer_group) => customer_group.customer)
    @JoinColumn({ name: "customer_group_id" })
    customer_group_id: CustomerGroup;

    @OneToMany(() => CustomerAddress, (customer_address) => customer_address.customer)
    customer_address: CustomerAddress

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    status: string;
  
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
  }
  
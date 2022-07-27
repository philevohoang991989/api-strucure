import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  import { Customer } from './customerModal'
  
  @Entity()
  export class CustomerAddress {
    @PrimaryGeneratedColumn()
    id: number;

      
    @ManyToOne(() => Customer, (customer) => customer.customer_group_id)
    @JoinColumn({ name: "customer_id" })
    customer : Customer
  
    @Column()
    name: string;

    @Column()
    adress: string;
  
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
  
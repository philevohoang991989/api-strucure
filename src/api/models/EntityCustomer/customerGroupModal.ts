import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToMany
  } from "typeorm";
  import {Customer} from './customerModal'
  
  @Entity()
  export class CustomerGroup {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    @OneToMany(() => Customer, (customer) => customer.customer_group_id)
    customer : Customer

    @Column()
    description: string;
  
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
  
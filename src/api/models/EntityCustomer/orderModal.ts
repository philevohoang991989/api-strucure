import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Customer } from "./customerModal";
import { OrderItem } from "./orderItemModal";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_code: string;

  @ManyToOne(() => Customer, (customer) => customer.order)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrderItem, (order_item) => order_item.order)
  order_item: OrderItem;

  @Column()
  note: string;

  @Column()
  status: number;

  @Column()
  payment_status: number;

  @Column()
  payment_method: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  sub_total: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  discount_amount: number;

  @Column()
  coupon: string;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  total: number;

  @Column()
  shipping_address: string;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  shipping_amount: number;

  @Column()
  billing_address: string;

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

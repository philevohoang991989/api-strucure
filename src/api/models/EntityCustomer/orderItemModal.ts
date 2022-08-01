import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Order } from "./orderModal";
import { Product } from "./productModal";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.order_item)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_item)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_entity_id: number;

  @Column()
  note: string;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  item_discount: number;

  @Column()
  unit_price: number;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  total: number;

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

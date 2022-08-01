import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./productModal";
import { OptionValue } from "./optionValueModal";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_option_id: number;

  @Column()
  option_id: number;

  @ManyToOne(() => OptionValue, (option_value) => option_value.product_entity)
  @JoinColumn({ name: "option_value_id" })
  option_value: OptionValue;

  @ManyToOne(() => Product, (product) => product.product_entity)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  price: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  price_discount: number;

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

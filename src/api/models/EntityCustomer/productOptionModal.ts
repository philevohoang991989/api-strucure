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
import { Option } from "./optionModal";

@Entity()
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.product_option)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Option, (option) => option.product_option)
  @JoinColumn({ name: "option_id" })
  option: Option;

  @Column()
  option_value: string;

  @Column()
  required: number;

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

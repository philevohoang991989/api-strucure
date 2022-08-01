import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Category } from "./categoryModal";
import { Product } from "./productModal";

@Entity()
export class ProductToCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.product_to_category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Product, (product) => product.product_to_category)
  @JoinColumn({ name: "product_id" })
  product: Product;
}

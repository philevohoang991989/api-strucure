import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { ProductToCategory } from "./productToCategoryModal";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Category, (category) => category.id)
  @JoinColumn({ name: "parent_id" })
  category: Category;

  @OneToMany(
    () => ProductToCategory,
    (product_to_category) => product_to_category.category
  )
  product_to_category: ProductToCategory;

  @Column()
  name: string;

  @Column()
  top: string;

  @Column()
  status: number;

  @Column()
  sort_order: number;

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

  @Column()
  type: number;
}

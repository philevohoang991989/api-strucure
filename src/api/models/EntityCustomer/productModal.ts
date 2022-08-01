import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { ProductUnit } from "./productUnitModal";
import { OrderItem } from "./orderItemModal";
import { ProductEntity } from "./productEntityModal";
import { Review } from "./reviewModal";
import { ProductDescription } from "./productDescriptionModal";
import { ProductToCategory } from "./productToCategoryModal";
import { ProductOption } from "./productOptionModal";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modal: string;

  @Column()
  sku: string;

  @Column()
  stock_status: number;

  @Column({ type: "decimal", precision: 15, scale: 4, default: 0 })
  price: number;

  @ManyToOne(() => ProductUnit, (product_unit) => product_unit.product)
  @JoinColumn({ name: "unit_id" })
  productUnit: ProductUnit;

  @OneToMany(
    () => ProductToCategory,
    (product_to_category) => product_to_category.product
  )
  product_to_category: ProductToCategory;

  @OneToMany(
    () => ProductDescription,
    (product_description) => product_description.product
  )
  product_description: ProductDescription;

  @OneToMany(() => ProductOption, (product_option) => product_option.product)
  product_option: ProductOption;

  @OneToMany(() => Review, (review) => review.product)
  review: Review;

  @OneToMany(() => ProductEntity, (product_entity) => product_entity.product)
  product_entity: ProductEntity;

  @OneToMany(() => OrderItem, (order_item) => order_item.product)
  order_item: OrderItem;

  @Column()
  user_init: number;

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

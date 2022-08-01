import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OptionDescription } from "./optionDescriptionModal";
import { OptionValueDescription } from "./optionValueDescriptionModal";
import { Option } from "./optionModal";
import { ProductEntity } from "./productEntityModal";

@Entity()
export class OptionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => OptionDescription,
    (OptionDescription) => OptionDescription.option
  )
  option_description: OptionDescription;

  @ManyToOne(() => Option, (option) => option.option_value)
  @JoinColumn({ name: "option_id" })
  option: Option;

  @OneToMany(
    () => OptionValueDescription,
    (option_value_description) => option_value_description.option_value_id
  )
  option_value_description: OptionValueDescription;

  @ManyToOne(
    () => ProductEntity,
    (product_entity) => product_entity.option_value
  )
  product_entity: ProductEntity;

  @Column()
  image: string;

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
}

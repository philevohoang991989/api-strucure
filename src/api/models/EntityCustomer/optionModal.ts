import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { OptionDescription } from "./optionDescriptionModal";
import { OptionValue } from "./optionValueModal";
import { ProductOption } from "./productOptionModal";

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => OptionDescription,
    (OptionDescription) => OptionDescription.option
  )
  option_description: OptionDescription;

  @OneToMany(() => ProductOption, (product_option) => product_option.option)
  product_option: ProductOption;

  @OneToMany(() => OptionValue, (optionValue) => optionValue.option)
  option_value: OptionValue;

  @Column()
  type: string;

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

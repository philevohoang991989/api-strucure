import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { OptionValue } from "./optionValueModal";

@Entity()
export class OptionValueDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => OptionValue,
    (option_value) => option_value.option_value_description
  )
  @JoinColumn({ name: "option_value_id" })
  option_value_id: OptionValue;

  @Column()
  language_id: number;

  @Column()
  name: string;

  @Column()
  option_value: number;

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

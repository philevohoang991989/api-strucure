import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Option } from "./optionModal";

@Entity()
export class OptionDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Option, (option) => option.option_description)
  @JoinColumn({ name: "option_id" })
  option: Option;

  @Column()
  type: string;

  @Column()
  language_id: number;

  @Column()
  name: string;

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

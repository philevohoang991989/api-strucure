import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./categoryModal";
import { Language } from "../EntityAdmin/languageModal";

@Entity()
export class CategoryDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Language, (language) => language.id)
  @JoinColumn({ name: "language_id" })
  language_id: Language;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: "simple-array",
  })
  meta: string[];

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

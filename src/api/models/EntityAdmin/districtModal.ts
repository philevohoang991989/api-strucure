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
import { Country } from "./countryModal";
import { Ward } from "./wardModal";

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country, (country) => country.district_id)
  @JoinColumn({ name: "country_id" })
  country_id: Country;

  @OneToMany(() => Ward, (ward) => ward.district_id)
  ward_id: Ward;

  @Column()
  name: string;

  @Column()
  zip_code: number;

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

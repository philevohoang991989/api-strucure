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
import { District } from "./districtModal";

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country, (country) => country.district)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @ManyToOne(() => District, (district) => district.ward)
  @JoinColumn({ name: "district_id" })
  district: District;

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

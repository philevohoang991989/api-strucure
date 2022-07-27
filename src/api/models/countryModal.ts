import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    OneToMany,
  } from "typeorm";
  import {District} from './districtModal'
  
  @Entity()
  export class Country {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @OneToMany(() => District, (district) => district.country)
    district : District
  
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
  
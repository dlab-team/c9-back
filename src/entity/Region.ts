import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { City } from './City';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.region)
  citys: City[]
}
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { City } from './City';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.region)
  city: City[]
}
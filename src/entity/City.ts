import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Region } from './Region';
import { Publication } from './Publication';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.citys)
  @JoinColumn({ name: 'region_id'})
  region: Region;
}
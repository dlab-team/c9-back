import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Publication } from './Publication';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Publication, (publication) => publication.category)
  publications: Publication[]
}
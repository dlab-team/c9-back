import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Publication } from './Publication';

@Entity()
export class Author {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   description: string;

   @Column()
   photo: string;

   @OneToMany(() => Publication, (publications) => publications.author)
   publications: Publication[];
}
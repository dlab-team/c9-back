import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Publication } from "./Publication";

@Entity('questions')
export class Question{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text'})
    question: string

    @Column({ type: 'text'})
    answer: string

    @ManyToOne(() => Publication, publication => publication.questions, {cascade: true , onDelete: "CASCADE"})
    @JoinColumn({ name: 'publication_id'})
    publication: Publication
}
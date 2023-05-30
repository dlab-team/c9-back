import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Publication } from "./Publication"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @OneToMany(() => Publication, publication => publication.user)
    publications: Publication[]

}

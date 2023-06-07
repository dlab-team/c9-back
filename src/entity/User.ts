import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
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

    @Column({ default: false })
    isAdmin: boolean

    @Column({ nullable: true})
    token: string

    @Column({ default: false })
    enabled: boolean

    @OneToMany(() => Publication, publication => publication.user, { nullable: true })
    publications: Publication[]
}

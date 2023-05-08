import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('publications')
export class Publication {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true})
    name: string

    @Column()
    slug: string

    @Column({ type: 'text'})
    initialContent: string

    @Column({ type: 'text'})
    finalContent: string

}
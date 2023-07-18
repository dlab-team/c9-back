import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Questions";
import { Category } from "./Category";
import { Author } from "./Author";

@Entity("publications")
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column({ type: "text" })
  initialContent: string;

  @Column({ type: "text" })
  finalContent: string;

  @Column({ type: "text", nullable: true, default: "" })
  finalContent_EN: string;

  @Column({ type: "timestamp", nullable: true })
  fecha_publicacion: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.publications, {
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column("simple-array", { nullable: true })
  images: string[];

  @Column({ default: false })
  published: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 0 })
  visits: number;

  @ManyToOne(() => User, (user) => user.publications, { nullable: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Author, (author) => author.publications, { nullable: true })
  @JoinColumn({ name: "author_id" })
  author: Author;

  @OneToMany(() => Question, (question) => question.publication)
  questions: Question[];

  @Column({ type: "json", nullable: true })
  location: {
    regionId: number;
    cityId: number | null;
  };
  @Column({ type: "text", nullable: true })
  keywords: string;
}

import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Messages } from './Messages';

@Entity()
export class Chat {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@OneToMany(() => Messages, (message) => message.chat)
	messages: Messages[];
}

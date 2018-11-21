import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('password')
export class PasswordEntity extends BaseEntity {

	@PrimaryGeneratedColumn() user_id: number;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	password: string;
}

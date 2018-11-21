import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, getConnection, OneToOne, JoinColumn } from 'typeorm';
import { RegisterDto } from '../form/register.dto';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { PasswordEntity } from './password.entity';
import { LoginDto } from 'user/form/login.dto';
const key = 'cms_blog';
@Entity('user')
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn() user_id: number;

	@Column({
		type: 'varchar',
		length: 20,
		default: ''
	})
	nickname: string;

	@Column({
		type: 'varchar',
		length: 11,
		default: ''
	})
	phone: string;

	@Column({
		type: 'varchar',
		length: 200,
		default: ''
	})
	avatar: string;

	@Column({
		type: 'smallint',
		default: 0
	})
	sex: number;

	@Column({
		type: 'smallint',
		default: 1
	})
	rank: number;

	@Column({
		type: 'int',
		default: () => dayjs().unix()
	})
	created_at: number;

	@Column({
		type: 'varchar',
		length: 255,
		default: ''
	})
	token: string;

	@Column({
		type: 'int',
		default: 0
	})
	deleted_at: number;

	@OneToOne((type) => PasswordEntity, (PasswordEntity) => PasswordEntity.user_id)
	@JoinColumn({ name: 'user_id' })
	password: PasswordEntity;

	static encodePassword(password) {
		return crypto.createHmac('sha256', key).update(password).digest('hex');
	}

	static sign(userId) {
		return jwt.sign(
			{
				user_id: userId,
				expiresIn: '7d'
			},
			key
		);
	}

	static verify(token) {
		return jwt.verify(token, key);
	}

	static getUser(userId) {
		return this.findOne({
			where: {
				user_id: userId
			}
		});
	}

	static register(registerDto: RegisterDto) {
		const { nickname, phone, password } = registerDto;
		return getConnection().transaction(async (transactionalEntityManager) => {
			const count = await this.createQueryBuilder()
				.where('nickname = :nickname', {
					nickname
				})
				.orWhere('phone = :phone', {
					phone
				})
				.getCount();

			// 如果存在用户名或手机号被注册
			if (count) {
				throw new Error('用户名或手机号已被注册');
			}

			const user = new UserEntity();
			user.nickname = nickname;
			user.phone = phone;
			const userPassword = new PasswordEntity();
			userPassword.password = this.encodePassword(password);
			await transactionalEntityManager.save(userPassword);

			user.password = userPassword;
			user.token = this.sign(userPassword.user_id);
			await transactionalEntityManager.save(user);
			return user;
		});
	}

	static async login(loginDto: LoginDto) {
		const { phone, password } = loginDto;
		const isExist = await PasswordEntity.findOne({
			where: {
				phone,
				password: this.encodePassword(password)
			}
		});
		if (!isExist) {
			throw new Error('密码错误');
		}
		const user = await this.findOne({
			where: {
				phone,
				deleted_at: 0
			}
		});
		if (!user) {
			throw new Error('用户已注销');
		}
		const token = this.sign(user.user_id);
		user.token = token;
		this.save(user);
		return user;
	}
}

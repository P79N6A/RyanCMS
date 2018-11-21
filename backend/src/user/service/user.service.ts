import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { RegisterDto } from '../form/register.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from 'user/form/login.dto';
@Injectable()
export class UserService {
	constructor() {}

	register(registerDto: RegisterDto) {
		return UserEntity.register(registerDto);
	}

	getUser(userId: number) {
		return UserEntity.getUser(userId);
	}

	login(loginDto: LoginDto) {
		return UserEntity.login(loginDto);
	}
}

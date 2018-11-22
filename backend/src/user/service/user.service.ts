import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { RegisterDto } from '../form/register.dto';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../form/login.dto';
@Injectable()
export class UserService {
	constructor() {}

	register(registerDto: RegisterDto, userRank: number) {
		return UserEntity.register(registerDto, userRank);
	}

	getUser(userId: number) {
		return UserEntity.getUser(userId);
	}

	login(loginDto: LoginDto) {
		return UserEntity.login(loginDto);
	}
}

import { Controller, Get, Post, Body, Query, Next, Headers } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterDto } from '../form/register.dto';
import { LoginDto } from '../form/login.dto';
import { USER_RANK } from '../../common/constant/User';
import { Auth } from '../interface/Auth';
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/')
	async user() {
		return 'user';
	}

	@Post('/register')
	async register(@Body() registerDto: RegisterDto) {
		const data = new RegisterDto(registerDto);
		await data.validate();
		return this.userService.register(data, USER_RANK);
	}

	@Post('/login')
	async login(@Body() loginDto: LoginDto) {
		const data = new LoginDto(loginDto);
		await data.validate();
		return this.userService.login(loginDto);
	}

	@Get('/info')
	async getUser(@Headers('auth') auth: Auth) {
		return this.userService.getUser(auth.user_id);
	}
}

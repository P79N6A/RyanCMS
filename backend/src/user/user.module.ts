import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controller/user.controller';
import { AdminController } from './controller/admin.controller';

@Module({
	imports: [ TypeOrmModule.forFeature([ UserEntity ]), HttpModule ],
	controllers: [ UserController, AdminController ],
	providers: [ UserService ]
})
export class UserModule {}

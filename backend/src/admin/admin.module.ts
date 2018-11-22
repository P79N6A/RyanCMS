import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';

@Module({
	imports: [ TypeOrmModule.forFeature([]), HttpModule ],
	controllers: [ AdminController ],
	providers: [ AdminService ]
})
export class UserModule {}

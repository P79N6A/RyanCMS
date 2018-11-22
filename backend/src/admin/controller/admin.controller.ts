import { Controller, Get, Post, Body, Query, Next, Headers, UseGuards } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { AdminGuard } from '../../common/guards/admin.guard';
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
	constructor(private readonly userService: AdminService) {}
}

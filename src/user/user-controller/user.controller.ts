import {
	Controller,
	Get,
	Post,
	Body,
	ForbiddenException,
	Put,
	Param,
	UseGuards
} from '@nestjs/common';

import { ObjectIdValidationPipe } from '../../shared/object-id-validation-pipe/object-id-vadlidation.pipe';
import { Roles } from '../../auth/roles-decorator/roles.decorator';
import { RolesGuard } from '../../auth/roles-guard/roles.guard';
import { UserService } from '../user-service/user.service';
import { User, CreateUserDto } from '../model';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Put(':id')
	@Roles('admin')
	async put(
		@Param('id', new ObjectIdValidationPipe())
		id,
		@Body() updateUserDto: CreateUserDto
	) {
		return this.userService.update(id, updateUserDto);
	}

	@Get(':id')
	async findOne(
		@Param('id', new ObjectIdValidationPipe())
		id
	) {
		return await this.userService.findOne(id);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}
}

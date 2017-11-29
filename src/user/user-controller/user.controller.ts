import {
	Controller,
	Get,
	Post,
	Body,
	ForbiddenException,
	Put,
	Param,
	UseGuards,
	ValidationPipe,
	UsePipes,
	UseInterceptors
} from '@nestjs/common';

import { ObjectIdValidationPipe } from '../../shared/object-id-validation-pipe/object-id-vadlidation.pipe';
import { Roles } from '../../shared/roles-decorator/roles.decorator';
import { RolesGuard } from '../../shared/roles-guard/roles.guard';
import { DataResponseInterceptor } from '../../shared/data-response-interceptor/data-response.interceptor';
import { UserService } from '../user-service/user.service';
import { User, CreateUserDto } from '../model';

@Controller('/api/user')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe())
@UseInterceptors(DataResponseInterceptor)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@Put(':id')
	@Roles('admin')
	put(
		@Param('id', new ObjectIdValidationPipe())
		id,
		@Body() updateUserDto: CreateUserDto
	) {
		return this.userService.update(id, updateUserDto);
	}

	@Get(':id')
	findOne(
		@Param('id', new ObjectIdValidationPipe())
		id
	) {
		return this.userService.findOneById(id);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}
}

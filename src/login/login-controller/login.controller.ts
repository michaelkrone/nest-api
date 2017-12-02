import {
	Controller,
	Post,
	Body,
	ValidationPipe,
	UsePipes
} from '@nestjs/common';

import { ObjectIdValidationPipe } from '../../shared/object-id-validation-pipe/object-id-vadlidation.pipe';

import { LoginService } from '../login-service/login.service';
import { LoginRequestDto } from '../model/login-request.dto';

@Controller('login')
@UsePipes(new ValidationPipe())
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Post()
	async login(@Body() loginRequestDto: LoginRequestDto) {
		return await this.loginService.authenticate(loginRequestDto);
	}
}

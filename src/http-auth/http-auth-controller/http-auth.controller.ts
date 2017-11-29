import {
	Controller,
	Post,
	Body,
	ValidationPipe,
	UsePipes
} from '@nestjs/common';
import { ClientProxy, Client } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import { Transport } from '@nestjs/microservices';

import { HttpAuthService } from '../http-auth-service/http-auth.service';
import { HttpAuthRequestDto } from '../model/http-auth-request.dto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class HttpAuthController {
	@Client({ transport: Transport.REDIS, port: 6379 })
	client: ClientProxy;

	constructor(private readonly authService: HttpAuthService) {}

	@Post()
	authenticate(@Body() authDataDto: HttpAuthRequestDto) {
		return this.authService.authenticate(authDataDto);
	}
}

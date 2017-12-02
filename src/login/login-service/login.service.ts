import {
	Component,
	UnauthorizedException,
	BadRequestException
} from '@nestjs/common';
import { AuthRequestDto } from 'nest-microservice-auth';

import { UserService } from '../../user/user-service/user.service';
import { HttpAuthService } from '../../http-auth/http-auth-service/http-auth.service';
import { LoginRequestDto } from '../model/login-request.dto';
import { Observable } from 'rxjs/Observable';

@Component()
export class LoginService {
	constructor(
		private userService: UserService,
		private authService: HttpAuthService
	) {}

	async authenticate(loginRequestDto: LoginRequestDto) {
		const user = await this.userService.findOne({
			email: loginRequestDto.email
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const data: AuthRequestDto = {
			id: user._id.toString(),
			password: loginRequestDto.password,
			payload: user
		};

		return this.authService
			.authenticate(data)
			.catch(e => Observable.throw(new UnauthorizedException()));
	}
}

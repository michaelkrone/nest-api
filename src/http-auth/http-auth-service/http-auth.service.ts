import {
	Component,
	UnauthorizedException,
	BadRequestException
} from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import { AuthRequestDto } from 'nest-microservice-auth';
import { HttpAuthRequestDto } from '../model/http-auth-request.dto';
import { UserService } from '../../user/user-service/user.service';

@Component()
export class HttpAuthService {
	@Client({ transport: Transport.REDIS, port: 6379 })
	client: ClientProxy;

	constructor(private userService: UserService) {}

	async authenticate(authDataDto: HttpAuthRequestDto) {
		return await this.command('authenticate', authDataDto);
	}

	async create(authDataDto: HttpAuthRequestDto) {
		return await this.command('create', authDataDto);
	}

	private async command(cmd: string, request: HttpAuthRequestDto) {
		const user = await this.userService.findOne({ email: request.email });
		if (!user) {
			return Observable.of(new UnauthorizedException());
		}

		const data: AuthRequestDto = {
			id: request.email,
			password: request.password,
			payload: user
		};

		return this.client
			.send({ cmd }, data)
			.catch(e => Observable.throw(new BadRequestException()));
	}

	validate(request: any): boolean {
		console.log('auth service validate', request);
		return true;
	}
}

import {
	Component,
	UnauthorizedException,
	BadRequestException
} from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import { AuthRequestDto } from 'nest-microservice-auth';
import { UserService } from '../../user/user-service/user.service';

@Component()
export class HttpAuthService {
	@Client({ transport: Transport.REDIS, port: 6379 })
	client: ClientProxy;

	constructor() {}

	authenticate(authDto: AuthRequestDto) {
		return this.command('authenticate', authDto);
	}

	create(authDto: AuthRequestDto) {
		return this.command('create', authDto);
	}

	private command(cmd: string, authDto: AuthRequestDto) {
		return this.client
			.send({ cmd }, authDto)
			.catch(e => Observable.throw(new BadRequestException(e)));
	}
}

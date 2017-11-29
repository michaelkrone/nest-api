import {
	Module,
	NestModule,
	MiddlewaresConsumer,
	RequestMethod
} from '@nestjs/common';
import * as passport from 'passport';
import { AuthModule } from 'nest-microservice-auth';

import { UserModule } from '../user/user.module';
import { HttpAuthService } from './http-auth-service/http-auth.service';
import { HttpAuthController } from './http-auth-controller/http-auth.controller';
import { httpAuthProviders } from './http-auth.provider';

@Module({
	modules: [AuthModule, UserModule],
	components: [...httpAuthProviders, HttpAuthService],
	controllers: [HttpAuthController]
})
export class HttpAuthModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer) {
		consumer
			.apply(passport.authenticate('jwt', { session: false }))
			.forRoutes({ path: '/api/*', method: RequestMethod.ALL });
	}
}

import {
	Module,
	NestModule,
	MiddlewaresConsumer,
	RequestMethod,
	forwardRef
} from '@nestjs/common';
import * as passport from 'passport';
import { JwtModule } from 'nest-microservice-auth';

import { HttpAuthService } from './http-auth-service/http-auth.service';

@Module({
	modules: [JwtModule],
	components: [HttpAuthService],
	controllers: [],
	exports: [HttpAuthService]
})
export class HttpAuthModule implements NestModule {
	public configure(consumer: MiddlewaresConsumer) {
		consumer
			.apply(passport.authenticate('jwt', { session: false }))
			.forRoutes({ path: '/api/*', method: RequestMethod.ALL });
	}
}

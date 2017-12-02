import { Module } from '@nestjs/common';
import * as passport from 'passport';

import { UserModule } from '../user/user.module';

import { SharedModule } from '../shared/shared.module';
import { HttpAuthModule } from '../http-auth/http-auth.module';
import { LoginService } from './login-service/login.service';
import { LoginController } from './login-controller/login.controller';

@Module({
	modules: [UserModule, SharedModule, HttpAuthModule],
	components: [LoginService],
	controllers: [LoginController],
	exports: []
})
export class LoginModule {}

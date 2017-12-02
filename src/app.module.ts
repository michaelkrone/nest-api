import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { HttpAuthModule } from './http-auth/http-auth.module';
import { LoginModule } from './login/login.module';

@Module({
	modules: [LoginModule, UserModule]
})
export class ApplicationModule {}

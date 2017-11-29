import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { HttpAuthModule } from './http-auth/http-auth.module';

@Module({
	modules: [HttpAuthModule]
})
export class ApplicationModule {}

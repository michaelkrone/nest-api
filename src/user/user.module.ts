import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './user-controller/user.controller';
import { UserService } from './user-service/user.service';
import { userProviders } from './user-provider/user.provider';

@Module({
	modules: [DatabaseModule, SharedModule],
	controllers: [UserController],
	components: [UserService, ...userProviders]
})
export class UserModule {}

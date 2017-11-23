import { Module } from '@nestjs/common';

import { databaseProviders } from './database-provider/database.providers';

@Module({
	components: [...databaseProviders],
	exports: [...databaseProviders]
})
export class DatabaseModule {}

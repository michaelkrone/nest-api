import { Connection, MongoRepository } from 'typeorm';

import { DefaultDbConnectionToken } from '../database/config/token';
import { UserRepositoryToken } from './config/token';
import { User } from './model';

export const userProviders = [
	{
		provide: UserRepositoryToken,
		useFactory: (connection: Connection): MongoRepository<User> =>
			connection.getMongoRepository(User),
		inject: [DefaultDbConnectionToken]
	}
];

import { Connection, MongoRepository } from 'typeorm';

import { UserRepositoryToken } from '../config/token';
import { UserDbConnectionToken } from '../../database/config/token';
import { User } from './user.entity';

export const userProviders = [
	{
		provide: UserRepositoryToken,
		useFactory: (connection: Connection): MongoRepository<User> =>
			connection.getMongoRepository(User),
		inject: [UserDbConnectionToken]
	}
];

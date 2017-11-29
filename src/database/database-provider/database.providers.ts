import { createConnection, Connection } from 'typeorm';

import { DatabaseConfig } from '../../config';
import { UserDbConnectionToken } from '../config/token';

export const databaseProviders = [
	{
		provide: UserDbConnectionToken,
		useFactory: async (): Promise<Connection> =>
			await createConnection(DatabaseConfig)
	}
];

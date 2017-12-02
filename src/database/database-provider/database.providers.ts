import { createConnection, Connection } from 'typeorm';

import { DatabaseConfig } from '../../config';
import { DefaultDbConnectionToken } from '../config/token';

export const databaseProviders = [
	{
		provide: DefaultDbConnectionToken,
		useFactory: async (): Promise<Connection> =>
			await createConnection(DatabaseConfig)
	}
];

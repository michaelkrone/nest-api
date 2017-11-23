import { Connection } from 'mongoose';

import { DefaultDbConnectionToken } from '../../database/token';
import { UserModelToken } from '../config/token';
import { UserSchema, UserModelName } from '../model';

export const userProviders = [
	{
		provide: UserModelToken,
		useFactory: (connection: Connection) =>
			connection.model(UserModelName, UserSchema),
		inject: [DefaultDbConnectionToken]
	}
];

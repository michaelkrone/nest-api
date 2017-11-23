import * as mongoose from 'mongoose';

import { DatabaseName } from '../../config';
import { DefaultDbConnectionToken } from '../token';

export const databaseProviders = [
	{
		provide: DefaultDbConnectionToken,
		useFactory: async () => {
			(mongoose as any).Promise = global.Promise;
			return await mongoose.connect(`mongodb://localhost/${DatabaseName}`, {
				useMongoClient: true
			});
		}
	}
];

import { join } from 'path';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { User } from '../user/model/user.entity';

// const entities = [join(__dirname, '../', '**/**.entity.{ts, js}')];

export const DatabaseConfig: MongoConnectionOptions = {
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	database: 'jha',
	entities: [User],
	logging: true
};

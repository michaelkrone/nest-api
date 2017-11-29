import { join } from 'path';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const entities = [join(__dirname, '../', '**/**.entity.{ts, js}')];

export const DatabaseConfig: ConnectionOptions = {
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	database: 'jha',
	entities
};

import {
	Column,
	ObjectIdColumn,
	Entity,
	Index,
	ObjectID,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { assign } from 'lodash';

import { CreateUserDto } from './user.dto';

@Entity()
export class User {
	@ObjectIdColumn() _id: ObjectID;

	@Column() name: string;

	@Column()
	@Index({ unique: true })
	email: string;

	@Column() roles: string[];

	@CreateDateColumn() created: Date;

	@UpdateDateColumn() updated: Date;
}

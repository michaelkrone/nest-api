import { Column, ObjectIdColumn, Entity, Index, ObjectID } from 'typeorm';

@Entity()
export class User {
	@ObjectIdColumn() _id: ObjectID;

	@Column() name: string;

	@Column()
	@Index({ unique: true })
	email: string;

	@Column() roles: string[];

	constructor(name: string, email: string, roles: string[]) {
		this.name = name;
		this.email = email;
		this.roles = roles;
	}
}

import { Component, Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';

import { UserRepositoryToken } from '../config/token';
import { User, CreateUserDto } from '../model';

@Component()
export class UserService {
	constructor(
		@Inject(UserRepositoryToken)
		private readonly repository: MongoRepository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		return await this.repository.create(createUserDto);
	}

	async update(id: string, createUserDto: CreateUserDto): Promise<User> {
		const user = await this.repository.findOneAndUpdate(
			{ _id: id },
			createUserDto
		);
		return user.value;
	}

	async findAll(): Promise<User[]> {
		return await this.repository.find();
	}

	async findOneById(id: string): Promise<User> {
		return await this.repository.findOneById(id);
	}

	async findOne(query: any): Promise<User> {
		return await this.repository.findOne(query);
	}
}

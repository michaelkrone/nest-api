import {
	Component,
	Inject,
	BadRequestException,
	NotFoundException
} from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HttpAuthService } from '../../http-auth/http-auth-service/http-auth.service';
import { UserRepositoryToken } from '../config/token';
import { User, CreateUserDto, UpdateUserDto } from '../model';

@Component()
export class UserService {
	constructor(
		@Inject(UserRepositoryToken)
		private readonly repository: MongoRepository<User>,
		private authService: HttpAuthService
	) {}

	async create(data: CreateUserDto): Promise<User> {
		const user = await this.repository.save(this.repository.create(data));
		return this.createAuth(user, data)
			.map(() => user)
			.toPromise();
	}

	async update(id: string, data: UpdateUserDto): Promise<User> {
		const user = await this.findOneById(id);
		if (!user) {
			throw new NotFoundException();
		}

		const updated = await this.repository.save(
			this.repository.merge(user, data)
		);
		return this.createAuth(updated, data)
			.map(t => user)
			.toPromise();
	}

	async findAll(): Promise<User[]> {
		return await this.repository.find();
	}

	async findOneById(id: string): Promise<User> {
		return await this.repository.findOneById(id);
	}

	async findOne(query: Partial<User>): Promise<User> {
		return await this.repository.findOne(query);
	}

	private createAuth(user: User, data: Partial<CreateUserDto>) {
		if (data.password) {
			return this.authService.create({
				id: user._id.toString(),
				password: data.password,
				payload: user
			});
		}

		return empty();
	}
}

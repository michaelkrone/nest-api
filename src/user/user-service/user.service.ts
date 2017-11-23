import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { UserModelToken } from '../config/token';
import { User, CreateUserDto } from '../model';

@Component()
export class UserService {
	constructor(
		@Inject(UserModelToken) private readonly userModel: Model<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		return await createdUser.save();
	}

	async update(id: string, createUserDto: CreateUserDto): Promise<User> {
		return await this.userModel
			.findByIdAndUpdate(id, createUserDto, { new: true })
			.exec();
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User> {
		return await this.userModel.findById(id).exec();
	}
}

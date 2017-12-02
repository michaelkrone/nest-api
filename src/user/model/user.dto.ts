import { IsString, IsInt, IsArray, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
	@IsString() readonly name: string;

	@IsEmail() readonly email: string;

	@IsArray() readonly roles: string[];

	@IsString() readonly password: string;
}

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	readonly name: string;

	@IsOptional()
	@IsEmail()
	readonly email: string;

	@IsOptional()
	@IsArray()
	readonly roles: string[];

	@IsOptional()
	@IsString()
	readonly password: string;
}

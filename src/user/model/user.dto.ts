import { IsString, IsInt, IsArray, IsEmail } from 'class-validator';

export class CreateUserDto {
	@IsString() readonly name: string;

	@IsEmail() readonly email: string;

	@IsArray() readonly roles: string[];

	@IsString() readonly password: string;
}

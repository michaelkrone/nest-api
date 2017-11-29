import { IsString, IsInt } from 'class-validator';

export class HttpAuthRequestDto {
	@IsString() readonly email: string;

	@IsString() readonly password: string;
}

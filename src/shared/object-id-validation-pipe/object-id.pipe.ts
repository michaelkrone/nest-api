import { HttpException } from '@nestjs/common';
import {
	PipeTransform,
	Pipe,
	ArgumentMetadata,
	HttpStatus
} from '@nestjs/common';
import { ObjectID } from 'typeorm';

@Pipe()
export class ObjectIdValidationPipe implements PipeTransform<string> {
	async transform(value: string, metadata: ArgumentMetadata) {
		if (
			['param', 'query'].indexOf(metadata.type) > -1 &&
			!ObjectID.isValid(value)
		) {
			throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

import { HttpException } from '@nestjs/common';
import {
	PipeTransform,
	Pipe,
	ArgumentMetadata,
	HttpStatus
} from '@nestjs/common';
import { ObjectId } from 'bson';

@Pipe()
export class ObjectIdValidationPipe implements PipeTransform<string> {
	async transform(value: string, metadata: ArgumentMetadata) {
		if (
			['param', 'query'].indexOf(metadata.type) > -1 &&
			!ObjectId.isValid(value)
		) {
			throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

import { Types } from 'mongoose';
import { HttpException } from '@nestjs/common';
import {
	PipeTransform,
	Pipe,
	ArgumentMetadata,
	HttpStatus
} from '@nestjs/common';

@Pipe()
export class ObjectIdValidationPipe implements PipeTransform<string> {
	async transform(value: string, metadata: ArgumentMetadata) {
		if (
			['param', 'query'].indexOf(metadata.type) > -1 &&
			!Types.ObjectId.isValid(value)
		) {
			throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

import {
	PipeTransform,
	Pipe,
	ArgumentMetadata,
	HttpStatus,
	HttpException
} from '@nestjs/common';
import { ObjectId } from 'bson';

@Pipe()
export class ObjectIdValidationPipe implements PipeTransform<string> {
	async transform(value: string, metadata: ArgumentMetadata) {
		if (
			['param', 'query'].indexOf(metadata.type) > -1 &&
			!ObjectId.isValid(value)
		) {
			throw new HttpException(
				'Request validation failed',
				HttpStatus.BAD_REQUEST
			);
		}

		return value;
	}
}

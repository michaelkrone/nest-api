import { Reflector } from '@nestjs/core';
import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { omit } from 'lodash';

@Interceptor()
export class PropertyFilterInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}
	intercept(
		dataOrRequest,
		context: ExecutionContext,
		stream$: Observable<any>
	): Observable<any> {
		const { parent, handler } = context;
		const filter = this.reflector.get<string[]>('propertyFilter', handler);
		if (!filter || filter.length === 0) {
			return stream$;
		}
		return stream$.map(streamData => {
			if ('data' in streamData) {
				omit(streamData.data, filter);
			} else {
				omit(streamData, filter);
			}

			return streamData;
		});
	}
}

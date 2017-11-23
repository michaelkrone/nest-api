import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Interceptor()
export class DataResponseInterceptor implements NestInterceptor {
	intercept(
		dataOrRequest,
		context: ExecutionContext,
		stream$: Observable<any>
	): Observable<any> {
		return stream$.map(data => ({ data }));
	}
}

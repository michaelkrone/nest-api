import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception-filter/http-exception-filter';
import { DataResponseInterceptor } from './shared/data-response-interceptor/data-response.interceptor';

export async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);

	app.use(bodyParser.json());
	// app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	// app.useGlobalInterceptors(new DataResponseInterceptor());

	await app.listen(3000);
}
bootstrap();

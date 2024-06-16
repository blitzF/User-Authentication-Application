import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());
	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: 'Content-Type, Accept, Authorization',
		exposedHeaders: 'Content-Length, X-Kuma-Revision',
	});
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);
	const port = configService.get('API_PORT') || 3000;
	await app.listen(port, () => {
		console.log(`🚀 Application running at port ${port}`);
	});
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config, configDotenv } from 'dotenv';
import { AppModule } from './app.module';

configDotenv();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
	// 자동화 문서 설정
	const documentConfig = new DocumentBuilder()
		.setTitle('PandaTalk V2')
		.setDescription('PandaTalk : Daeduck Software Meister Highschool\'s notification service with allimtalk')
		.setVersion('2.0.0')
		.addTag('pandaTalk')
		.build();
	const documentCreate = SwaggerModule.createDocument(app, documentConfig);
	SwaggerModule.setup('document', app, documentCreate); // /document로 문서 생성

	// CORS 설정 : GET, POST, PUT, PATCH, DELETE 허용
	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
	})

	// 포트 연결
    await app.listen(process.env.PORT);
}
bootstrap();

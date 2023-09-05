import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				type: "mysql",
				timezone: configService.get<string>('DB_TIMEZONE'),
				host: configService.get<string>('DB_HOST'), // 로컬 접속 호스트
				port: configService.get<number>('DB_PORT'), // 포트
				username: configService.get<string>('DB_USERNAME'), // DB 접속 계정의 이름
				password: configService.get<string>('DB_PASSWORD'), // DB 접속 계정의 비밀번호
				database: configService.get<string>('DB_NAME'), // DB 테이블 이름
				entities: [ __dirname + '/**/entity/*.js'],
				synchronize: false, 
				logging: false, // 로그찍기
				migrations: [__dirname + '/**/migrations/*.js'],
				migrationsTableName: 'migrations',
				autoLoadEntities: true,
			}),
			inject: [ConfigService]
		}),
		RedisModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				readyLog: true,
				config: {
					host: configService.get<string>('REDIS_HOST'),
					port: configService.get<number>('REDIS_PORT'),
					password: configService.get<string>('REDIS_PASSWORD')
				}
			})
		}),
		AuthModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

// class-validator
// @nestjs/swagger
// dotenv
// @nesetjs/config
// mysql
// @nestjs/typeorm typeorm
// bcrypt @types/bcrypt
// @liaoliaots/nestjs-redis ioredis
// @nestjs/cqrs : Testing
import { Test, TestingModule } from '@nestjs/testing';
import { EventBus } from '@nestjs/cqrs'
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { HttpExceptionFilter } from 'src/http-exception.filter/http-exception.filter';

describe('AuthService', () => {
	let service: AuthService;
	let eventBus: jest.Mocked<EventBus>;
	let authRepository: Repository<User>;
	let exceptionFilter: HttpExceptionFilter;
	
	beforeAll(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: EventBus,
					useValue: {
						publish: jest.fn()
					},
				}
			],
		}).compile();

		service = module.get(AuthService);
		eventBus = module.get(EventBus);
		authRepository = module.get<Repository<User>>(Repository<User>);
	});

	describe('create', () => {
		it('should create user', async () => {
			const user = service.createAuth({
				userLogID: 'userID',
				userLogPW: 'useRPW123!@#',
				userName: '홍길동',
				userDepartment: '마이스터부'
			})

			const expected = await authRepository.save({
				userID: 1,
				userLogID: 'userID',
				userLogPW: 'useRPW123!@#',
				userName: '홍길동',
				userDepartment: '마이스터부'
			});

			expect(expected).toEqual(user);
			expect(eventBus.publish).toBeCalledTimes(1);
		})
	})
});

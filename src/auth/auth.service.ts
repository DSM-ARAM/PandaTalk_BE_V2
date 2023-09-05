import { ConflictException, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserAccDTO } from './dto/userAcc.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        
    }

    async createAuth(userAcc: UserAccDTO): Promise<object> {
        const { userLogID, userLogPW, userName, userDepartment } = userAcc;

        const thisLogID = this.userRepository.findOneBy({ userLogID });
        if (thisLogID) throw new ConflictException();

        const userPW = await bcrypt.hash(userLogPW, this.configService.get<number>('HASH_ROUNDS'));

        const thisUser = await this.userRepository.save({
            userLogID,
            userPW,
            userName,
            userDepartment,
        })

        return thisUser;
    }
}

import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserAccDTO } from './dto/userAcc.dto';

@Controller('auth')
export class AuthController { 
    constructor(
        private authService: AuthService,
    ) { }
    
    @ApiOperation({
        summary: "",
        description: ""
    })
    @ApiBody({ type: UserAccDTO })
    @ApiCreatedResponse({
        status: 201,
        description: "계정 생성 완료"
    })
    @ApiConflictResponse({
        status: 409,
        description: "아이디 중복"
    })
    @Post('auth')
    async createAcc(userAcc: UserAccDTO): Promise<object>{
        const data = await this.authService.createAuth(userAcc);

        return {
            data,
            statusCode: 201,
            statusMsg: "계정 생성 완료"
        }
    }
}

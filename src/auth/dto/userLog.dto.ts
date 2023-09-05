import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class userLogDTO {
    @ApiProperty({
        example: 'ThisIsID',
        description: 'This is an ID for login'
    })
    @IsString()
    userLogID: string;

    @ApiProperty({
        example: 'thisIsPW!@#123',
        description: 'This is a PW for login, It must include speacial mark and number'
    })
    @IsString()
    userLogPW: string;
}

// class-validator
// @nestjs/swagger
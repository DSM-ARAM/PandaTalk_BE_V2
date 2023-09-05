import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UserAccDTO {
    @ApiProperty({
        example: '',
        description: ''
    })
    @IsString()
    userLogID: string;

    @ApiProperty({
        example: '',
        description: ''
    })
    @IsString()
    userLogPW: string;

    @ApiProperty({
        example: '',
        description: ''
    })
    @IsString()
    userName: string;

    @ApiProperty({
        example: '',
        description: ''
    })
    @IsString()
    @IsOptional()
    userDepartment: string;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column({
        unique: true
    })
    userLogID: string;

    @Column()
    userPW: string;

    @Column()
    userName: string;

    @Column()
    userDepartment: string;
}
import { IsString, IsInt } from 'class-validator';

export class CreateMurmurDto {
    @IsString()
    text: string;

    @IsInt()
    userId: number;
}

import { IsInt } from 'class-validator';

export class ToggleLikeDto {
    @IsInt()
    userId: number;

    @IsInt()
    murmurId: number;
}

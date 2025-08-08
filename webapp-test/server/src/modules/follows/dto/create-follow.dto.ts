import { IsInt } from 'class-validator';

export class ToggleFollowDto {
    @IsInt()
    followerId: number;

    @IsInt()
    followedId: number;
}

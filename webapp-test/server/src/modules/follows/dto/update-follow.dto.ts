import { PartialType } from '@nestjs/mapped-types';
import { ToggleFollowDto } from './create-follow.dto';

export class UpdateFollowDto extends PartialType(ToggleFollowDto) {}

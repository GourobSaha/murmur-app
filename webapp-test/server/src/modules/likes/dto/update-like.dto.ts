import { PartialType } from '@nestjs/mapped-types';
import { ToggleLikeDto } from './create-like.dto';

export class UpdateLikeDto extends PartialType(ToggleLikeDto) {}

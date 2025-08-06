import { Controller, Post, Body, Query, Get, ParseIntPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ToggleLikeDto } from './dto/create-like.dto';

@Controller('api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post('toggle')
  async toggleLike(@Body() dto: ToggleLikeDto) {
    return this.likesService.toggleLike(dto.userId, dto.murmurId);
  }

  @Get('count')
  async countLikes(@Query('murmurId', ParseIntPipe) murmurId: number) {
    return this.likesService.countLikes(murmurId);
  }
}

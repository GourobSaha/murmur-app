import { Controller, Post, Body, Get, Query, ParseIntPipe } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { ToggleFollowDto } from './dto/create-follow.dto';

@Controller('api/follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) { }

  @Post('toggle')
  async toggleFollow(@Body() dto: ToggleFollowDto) {
    return this.followsService.toggleFollow(dto.followerId, dto.followedId);
  }

  @Get('followers-count')
  async followersCount(@Query('userId', ParseIntPipe) userId: number) {
    return this.followsService.countFollowers(userId);
  }

  @Get('following-count')
  async followingCount(@Query('userId', ParseIntPipe) userId: number) {
    return this.followsService.countFollowing(userId);
  }
}

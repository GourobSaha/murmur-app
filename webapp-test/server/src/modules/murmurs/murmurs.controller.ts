// server/src/murmurs/murmurs.controller.ts
import { Controller, Post, Body, Delete, Param, Get, Query, ParseIntPipe } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Controller('api/murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) { }

  @Post('create')
  async create(@Body() dto: CreateMurmurDto) {
    return this.murmursService.create(dto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    return this.murmursService.delete(id, userId);
  }

  @Get('timeline')
  async getTimeline(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return this.murmursService.getTimeline(userId, page);
  }

  @Get('user/:userId')
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.murmursService.findByUser(userId);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.murmursService.findOne(id);
  }
}

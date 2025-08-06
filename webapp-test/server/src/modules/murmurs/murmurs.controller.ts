import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { UpdateMurmurDto } from './dto/update-murmur.dto';

@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) {}

  @Post()
  create(@Body() createMurmurDto: CreateMurmurDto) {
    return this.murmursService.create(createMurmurDto);
  }

  @Get()
  findAll() {
    return this.murmursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.murmursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMurmurDto: UpdateMurmurDto) {
    return this.murmursService.update(+id, updateMurmurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.murmursService.remove(+id);
  }
}

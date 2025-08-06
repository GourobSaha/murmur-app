import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Murmur } from './entities/murmur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Murmur])],
  controllers: [MurmursController],
  providers: [MurmursService],
  exports: [MurmursService, TypeOrmModule.forFeature([Murmur])],
})
export class MurmursModule {}

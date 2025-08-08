import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UsersModule } from '../users/users.module';
import { MurmursModule } from '../murmurs/murmurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UsersModule, MurmursModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { User } from '../users/entities/user.entity';
import { Murmur } from '../murmurs/entities/murmur.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>,
  ) { }

  async toggleLike(userId: number, murmurId: number): Promise<{ liked: boolean }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const murmur = await this.murmurRepository.findOne({ where: { id: murmurId } });

    if (!user || !murmur) {
      throw new Error('User or murmur not found');
    }

    const existingLike = await this.likeRepository.findOne({
      where: { user: { id: userId }, murmur: { id: murmurId } },
    });

    if (existingLike) {
      await this.likeRepository.remove(existingLike);
      return { liked: false };
    } else {
      const like = this.likeRepository.create({ user, murmur });
      await this.likeRepository.save(like);
      return { liked: true };
    }
  }

  async countLikes(murmurId: number): Promise<number> {
    return this.likeRepository.count({ where: { murmur: { id: murmurId } } });
  }
}

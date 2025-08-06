import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async toggleFollow(followerId: number, followedId: number): Promise<{ following: boolean }> {
    if (followerId === followedId) throw new Error('You cannot follow yourself');

    const follower = await this.userRepository.findOne({ where: { id: followerId } });
    const followed = await this.userRepository.findOne({ where: { id: followedId } });

    if (!follower || !followed) throw new Error('User not found');

    const existing = await this.followRepository.findOne({
      where: { follower: { id: followerId }, followed: { id: followedId } },
    });

    if (existing) {
      await this.followRepository.remove(existing);
      return { following: false };
    } else {
      const follow = this.followRepository.create({ follower, followed });
      await this.followRepository.save(follow);
      return { following: true };
    }
  }

  async countFollowers(userId: number): Promise<number> {
    return this.followRepository.count({ where: { followed: { id: userId } } });
  }

  async countFollowing(userId: number): Promise<number> {
    return this.followRepository.count({ where: { follower: { id: userId } } });
  }
}

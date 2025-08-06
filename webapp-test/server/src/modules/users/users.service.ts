// server/src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email'])
      .where('user.email = :email', { email })
      .andWhere('user.password = :password', { password })
      .getOne();

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email', 'user.createdAt', 'user.updatedAt'])
      .leftJoinAndSelect('user.followers', 'followers')
      .leftJoinAndSelect('user.following', 'following')
      .leftJoinAndSelect('user.murmurs', 'murmurs')
      .leftJoinAndSelect('user.likes', 'likes')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getFollowers(id: number): Promise<User[]> {
    const user = await this.findOneById(id);
    return user.followers.map(f => f.follower);
  }

  async getFollowing(id: number): Promise<User[]> {
    const user = await this.findOneById(id);
    return user.following.map(f => f.followed);
  }
}

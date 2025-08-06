import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Murmur } from './entities/murmur.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private readonly murmurRepository: Repository<Murmur>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createMurmurDto: CreateMurmurDto): Promise<Murmur> {
    const user = await this.userRepository.findOne({
      where: { id: createMurmurDto.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const murmur = this.murmurRepository.create({
      text: createMurmurDto.text,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    return this.murmurRepository.save(murmur);
  }

  async delete(id: number, userId: number): Promise<void> {
    const murmur = await this.murmurRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!murmur || murmur.user.id !== userId) {
      throw new NotFoundException('Murmur not found or unauthorized');
    }

    await this.murmurRepository.remove(murmur);
  }

  async findByUser(userId: number): Promise<Murmur[]> {
    const murmurs = await this.murmurRepository
      .createQueryBuilder('murmur')
      .leftJoin('murmur.user', 'user')
      .leftJoinAndSelect('murmur.likes', 'likes')
      .addSelect(['user.id', 'user.name'])
      .where('murmur.userId = :userId', { userId })
      .orderBy('murmur.createdAt', 'DESC')
      .getMany();

    return murmurs;
  }

  async getTimeline(userId: number, page: number, pageSize: number = 10): Promise<Murmur[]> {
    const offset = (page - 1) * pageSize;

    const murmurs = await this.murmurRepository
      .createQueryBuilder('murmur')
      .leftJoin('murmur.user', 'user')
      .leftJoinAndSelect('murmur.likes', 'likes')
      .addSelect(['user.id', 'user.name'])
      .where(new Brackets(qb => {
        qb.where('murmur.userId = :userId')
          .orWhere(qb2 => {
            const subQuery = qb2
              .subQuery()
              .select('follow.followedId')
              .from('follow', 'follow')
              .where('follow.followerId = :userId')
              .getQuery();
            return 'murmur.userId IN ' + subQuery;
          });
      }))
      .setParameter('userId', userId)
      .orderBy('murmur.createdAt', 'DESC')
      .offset(offset)
      .limit(pageSize)
      .getMany();

    return murmurs;
  }
  
  async findOne(id: number): Promise<Murmur> {
    const murmur = await this.murmurRepository.findOne({
      where: { id },
      relations: ['user', 'likes'],
    });

    if (!murmur) throw new NotFoundException('Murmur not found');
    return murmur;
  }
}

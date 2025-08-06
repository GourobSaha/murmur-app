import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@Unique(['follower', 'followed'])
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.following, { onDelete: 'CASCADE' })
    follower: User;

    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    followed: User;

    @CreateDateColumn()
    createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Murmur } from '../../murmurs/entities/murmur.entity';
import { Follow } from '../../follows/entities/follow.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => Murmur, murmur => murmur.user)
    murmurs: Murmur[];

    @OneToMany(() => Follow, follow => follow.follower)
    following: Follow[];

    @OneToMany(() => Follow, follow => follow.followed)
    followers: Follow[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

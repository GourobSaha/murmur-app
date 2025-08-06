import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Like } from '../../likes/entities/like.entity';

@Entity()
export class Murmur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @ManyToOne(() => User, user => user.murmurs, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Like, like => like.murmur)
    likes: Like[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

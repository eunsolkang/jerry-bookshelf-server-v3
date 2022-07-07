import { BookEntity } from '../../book/entity/book.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  verifyToken: string;

  @Column({ default: false })
  isEmailVerfied: boolean;

  @OneToMany(type=>BookEntity, book => book.user)
  books: BookEntity[];
}

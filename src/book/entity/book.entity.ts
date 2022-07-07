import { UserEntity } from 'src/users/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  report: string;

  @Column()
  rating: number;

  @Column()
  backgroundColor: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne((_)=>UserEntity, (user) => user.books)
  user: UserEntity;

}

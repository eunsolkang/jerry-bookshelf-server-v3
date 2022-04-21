import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}

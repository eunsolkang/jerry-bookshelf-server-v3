import { Inject, Injectable } from '@nestjs/common';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private userService: UsersService,
  ) {}

  async getBookList(): Promise<BookEntity[]> {
    const bookList = await this.bookRepository.find();

    return bookList;
  }

  async getBookById(id: string): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({id});
    return book;
  }

  async createBook(
    name: string,
    author: string,
    backgroundColor: string,
    imageUrl: string,
    rating: number,
    report: string,
    userId: string,
  ) {
    const book = new BookEntity();
    const user = await this.userService.getUserInfo(userId);

    book.id = ulid();
    book.name = name;
    book.author = author;
    book.imageUrl = imageUrl;
    book.backgroundColor = backgroundColor;
    book.report = report;
    book.rating = rating;
    book.user = user;

    await this.bookRepository.save(book);
  }
  /*
  async updateBook() {}
  */
  async deleteBook(id: string) {
    await this.bookRepository.delete({ id: id });
  }
}

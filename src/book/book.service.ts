import { Injectable } from '@nestjs/common';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBookList(): Promise<BookEntity[]> {
    const bookList = await this.bookRepository.find();

    return bookList;
  }

  async createBook(
    name: string,
    author: string,
    backgroundColor: string,
    imageUrl: string,
    rating: number,
    report: string,
  ) {
    const book = new BookEntity();

    book.id = ulid();
    book.name = name;
    book.author = author;
    book.imageUrl = imageUrl;
    book.backgroundColor = backgroundColor;
    book.report = report;
    book.rating = rating;

    await this.bookRepository.save(book);
  }
  /*
  async updateBook() {}
  */
  async deleteBook(id: string) {
    await this.bookRepository.delete({ id: id });
  }
}

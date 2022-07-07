import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getBookList() {
    return this.bookService.getBookList();
  }

  @Get('/:id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  async createBook(@Body() dto: CreateBookDto) {
    const { name, author, backgroundColor, imageUrl, rating, report, userId } = dto;

    await this.bookService.createBook(
      name,
      author,
      backgroundColor,
      imageUrl,
      rating,
      report,
      userId
    );
  }

  @Patch('/:id')
  async updateBook() {}

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [BookModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}

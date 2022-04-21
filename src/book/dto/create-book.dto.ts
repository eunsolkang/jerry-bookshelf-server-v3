import { IsNumber, IsString, maxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly backgroundColor: string;

  @IsString()
  readonly imageUrl: string;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly report: string;
}

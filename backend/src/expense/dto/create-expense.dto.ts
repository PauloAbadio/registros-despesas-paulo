
import { IsString, IsNotEmpty, IsNumber, Min, IsDateString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  date: string;
}

import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class OrderCreatedDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  total_price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  order_id: string;
}

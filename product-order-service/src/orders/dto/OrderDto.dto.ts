import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  product_id: string;
}

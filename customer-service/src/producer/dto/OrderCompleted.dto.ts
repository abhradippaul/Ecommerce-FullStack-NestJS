import { IsNotEmpty, IsString } from 'class-validator';

export class OrderCompletedDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class OrderCompletedDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  order_status: string;

  @IsString()
  @IsNotEmpty()
  order_id: string;
}

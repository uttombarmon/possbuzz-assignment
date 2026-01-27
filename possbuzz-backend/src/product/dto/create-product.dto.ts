import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  sku: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  stockQty: number;
}

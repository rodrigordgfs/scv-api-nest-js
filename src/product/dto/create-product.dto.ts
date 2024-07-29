import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsNumber({}, { message: 'O preço não pode ser vazio' })
  @Type(() => Number)
  price: number;

  @IsNotEmpty({ message: 'O unityId não pode ser vazio' })
  @IsString({ message: 'O unityId não pode ser vazio' })
  unityId: string;

  @IsArray({ message: 'O categoryId deve ser um array de strings' })
  @IsString({ each: true, message: 'Cada categoryId deve ser uma string' })
  categoryId: string[];
}

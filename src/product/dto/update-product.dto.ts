import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsNotEmpty({ message: 'O id não pode ser vazio' })
  @IsString({ message: 'O id não pode ser vazio' })
  @Type(() => String)
  readonly id: string;
}

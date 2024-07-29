import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDTO } from './create-category.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
  @IsNotEmpty({ message: 'O id não pode ser vazio' })
  @IsString({ message: 'O id não pode ser vazio' })
  @Type(() => String)
  readonly id: string;
}

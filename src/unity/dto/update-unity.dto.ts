import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUnityDTO } from './create-unity.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateUnityDTO extends PartialType(CreateUnityDTO) {
  @IsNotEmpty({ message: 'O id não pode ser vazio' })
  @IsString({ message: 'O id não pode ser vazio' })
  @Type(() => String)
  readonly id: string;
}

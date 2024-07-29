import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UnityService } from './unity.service';
import { CreateUnityDTO } from './dto/create-unity.dto';
import { UpdateUnityDTO } from './dto/update-unity.dto';

@Controller('unity')
export class UnityController {
  constructor(private readonly unityService: UnityService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.unityService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.page : 10,
      request.query.hasOwnProperty('sort') ? request.query.page : 'name',
      request.query.hasOwnProperty('order') ? request.query.page : 'asc',
      request.query.hasOwnProperty('search') ? request.query.page : '',
    );
  }

  @Post()
  async create(@Body() createUnityDTO: CreateUnityDTO) {
    return await this.unityService.create(createUnityDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnityDTO: UpdateUnityDTO,
  ) {
    return await this.unityService.update(id, updateUnityDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.unityService.delete(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.unityService.findById(id);
  }
}

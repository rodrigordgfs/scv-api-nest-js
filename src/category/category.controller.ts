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
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.categoryService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.page : 10,
      request.query.hasOwnProperty('sort') ? request.query.page : 'name',
      request.query.hasOwnProperty('order') ? request.query.page : 'asc',
      request.query.hasOwnProperty('search') ? request.query.page : '',
    );
  }

  @Post()
  async create(@Body() createCategoryDTO: CreateCategoryDTO) {
    return await this.categoryService.create(createCategoryDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return await this.categoryService.update(id, updateCategoryDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.categoryService.findById(id);
  }
}

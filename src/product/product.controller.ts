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
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.productService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.page : 10,
      request.query.hasOwnProperty('sort') ? request.query.page : 'name',
      request.query.hasOwnProperty('order') ? request.query.page : 'asc',
      request.query.hasOwnProperty('search') ? request.query.page : '',
    );
  }

  @Post()
  async create(@Body() createProductDTO: CreateProductDTO) {
    return await this.productService.create(createProductDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    return await this.productService.update(id, updateProductDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }
}

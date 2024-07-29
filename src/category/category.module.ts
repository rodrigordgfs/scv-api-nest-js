import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, CategoryRepository],
})
export class CategoryModule {}

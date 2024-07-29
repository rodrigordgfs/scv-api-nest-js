import { Module } from '@nestjs/common';
import { UnityModule } from './unity/unity.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UnityModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

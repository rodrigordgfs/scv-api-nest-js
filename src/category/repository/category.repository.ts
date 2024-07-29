import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from '../dto/create-category.dto';
import { UpdateCategoryDTO } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.category.findMany({
      skip: page * size,
      take: Number(size),
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.category.count({
      where: { name: { contains: search } },
    });
    return { results, totalItems };
  }

  async create(createCategoryDTO: CreateCategoryDTO) {
    return await this.prisma.category.create({
      select: { id: true },
      data: createCategoryDTO,
    });
  }

  async update(id: string, updateCategoryDTO: UpdateCategoryDTO) {
    return await this.prisma.category.update({
      where: { id },
      select: { id: true },
      data: updateCategoryDTO,
    });
  }

  async delete(id: string) {
    return await this.prisma.category.delete({
      select: { id: true },
      where: { id },
    });
  }

  async findById(id: string) {
    return await this.prisma.category.findFirstOrThrow({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateUnityDTO } from 'src/unity/dto/update-unity.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.product.findMany({
      skip: page * size,
      take: Number(size),
      include: {
        unity: true,
      },
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.product.count({
      where: { name: { contains: search } },
    });
    return { results, totalItems };
  }

  async create(createProductDTO: CreateProductDTO) {
    return await this.prisma.product.create({ data: createProductDTO });
  }

  async update(id: string, updateUnityDTO: UpdateUnityDTO) {
    return await this.prisma.product.update({
      where: { id },
      data: updateUnityDTO,
    });
  }

  async delete(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }

  async findById(id: string) {
    return await this.prisma.product.findFirstOrThrow({
      where: { id },
      include: { unity: true },
    });
  }
}

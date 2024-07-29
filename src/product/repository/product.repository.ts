import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

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
        categories: true,
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
    return await this.prisma.product.create({
      select: { id: true },
      data: {
        name: createProductDTO.name,
        price: createProductDTO.price,
        unityId: createProductDTO.unityId,
        categories: {
          connect: createProductDTO.categoryId.map((category) => ({
            id: category,
          })),
        },
      },
    });
  }

  async update(id: string, updateProductDTO: UpdateProductDTO) {
    await this.prisma.product.update({
      where: { id },
      select: { id: true },
      data: {
        categories: {
          set: [],
        },
      },
    });

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDTO.name,
        price: updateProductDTO.price,
        unityId: updateProductDTO.unityId,
        categories: {
          connect: updateProductDTO.categoryId.map((category) => ({
            id: category,
          })),
        },
      },
    });

    return product;
  }

  async delete(id: string) {
    return await this.prisma.product.delete({
      select: { id: true },
      where: { id },
    });
  }

  async findById(id: string) {
    return await this.prisma.product.findFirstOrThrow({
      where: { id },
      include: { unity: true, categories: true },
    });
  }
}

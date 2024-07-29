import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUnityDTO } from '../dto/create-unity.dto';
import { UpdateUnityDTO } from '../dto/update-unity.dto';

@Injectable()
export class UnityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.unity.findMany({
      skip: page * size,
      take: Number(size),
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.unity.count({
      where: { name: { contains: search } },
    });
    return { results, totalItems };
  }

  async create(createUnityDTO: CreateUnityDTO) {
    return await this.prisma.unity.create({ data: createUnityDTO });
  }

  async update(id: string, updateUnityDTO: UpdateUnityDTO) {
    return await this.prisma.unity.update({
      where: { id },
      data: updateUnityDTO,
    });
  }

  async delete(id: string) {
    return await this.prisma.unity.delete({ where: { id } });
  }

  async findById(id: string) {
    return await this.prisma.unity.findFirstOrThrow({ where: { id } });
  }
}

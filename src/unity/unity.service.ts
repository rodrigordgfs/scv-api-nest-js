import { Injectable } from '@nestjs/common';
import { UnityRepository } from './repository/unity.repository';
import { CreateUnityDTO } from './dto/create-unity.dto';
import { UpdateUnityDTO } from './dto/update-unity.dto';

@Injectable()
export class UnityService {
  constructor(private readonly repository: UnityRepository) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const { results, totalItems } = await this.repository.paginate(
      page,
      size,
      sort,
      order,
      search,
    );
    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async create(createUnityDTO: CreateUnityDTO) {
    return await this.repository.create(createUnityDTO);
  }

  async update(id: string, updateUnityDTO: UpdateUnityDTO) {
    return await this.repository.update(id, updateUnityDTO);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }
}

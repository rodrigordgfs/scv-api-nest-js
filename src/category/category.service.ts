import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

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

  async create(createCaqtegoryDTO: CreateCategoryDTO) {
    return await this.repository.create(createCaqtegoryDTO);
  }

  async update(id: string, updateCategoryDTO: UpdateCategoryDTO) {
    return await this.repository.update(id, updateCategoryDTO);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/repo.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategories() {
    data?.map(async (element) => {
      await this.categoriesRepository

        //? Contruimos la query para
        .createQueryBuilder()
        //? Insertar la categoría si no existe
        .insert()
        .into(Categories)
        //? en que tabala
        .values({ name: element.category })
        //? suprimo los errores
        .orIgnore()
        .execute();
    });
    return 'Categorías agregadas';
  }
}

/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }
  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product) {
    return this.productsService.updateProduct(id, product);
  }
}

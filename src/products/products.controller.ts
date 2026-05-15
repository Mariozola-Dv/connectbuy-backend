import { Controller, Get, Post, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("api/products")
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId: string = req.user.id || req.user.sub;
    return this.productService.create(userId, createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

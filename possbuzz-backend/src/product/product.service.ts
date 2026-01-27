import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, createProductDto: CreateProductDto) {
    console.log('userId: ', userId);
    const product = {
      name: createProductDto.name,
      sku: createProductDto.sku,
      price: createProductDto.price,
      stockQty: createProductDto.stockQty,
      authorId: userId,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const createdProduct = await this.prisma.product.create({
        data: product,
      });
      console.log('created product: ', createdProduct);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { data: createdProduct, message: 'Successfully Created Product' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
// export interface Product {
//   id?: number;
//   name: string;
//   sku: string;
//   price: number;
//   stockQty: number;
//   authorId: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

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

  async findAll() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const products = await this.prisma.product.findMany();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return products;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const product = await this.prisma.product.findFirst({ where: { id } });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      return {
        data: updateProductDto,
        message: 'Successfully Product Updated!',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

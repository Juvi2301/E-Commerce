import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Product } from './schemas/product.schema.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = await this.productModel.create(dto);

    return product;
  }

  async findAll() {
    return this.productModel.find().lean().exec();
  }

  async findOne(id: string) {
    this.validateId(id);

    const product = await this.productModel
      .findById(id)
      .lean()
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    this.validateId(id);

    const product = await this.productModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async remove(id: string) {
    this.validateId(id);

    const product = await this.productModel
      .findByIdAndDelete(id)
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return { message: 'Product deleted successfully' };
  }

  private validateId(id: string) {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      throw new BadRequestException('Invalid product ID');
    }
  }
}
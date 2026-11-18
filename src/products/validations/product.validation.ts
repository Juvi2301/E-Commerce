import Joi from 'joi';
import type { CreateProductDto } from '../dto/create-product.dto.js';
import type { UpdateProductDto } from '../dto/update-product.dto.js';

const name = Joi.string().trim().min(2).max(120);
const price = Joi.number().precision(2).min(0);
const stock = Joi.number().integer().min(0);

export const createProductSchema = Joi.object<CreateProductDto>({
  name: name.required(),
  price: price.required(),
  stock: stock.required(),
});

export const updateProductSchema = Joi.object<UpdateProductDto>({
  name,
  price,
  stock,
}).min(1);

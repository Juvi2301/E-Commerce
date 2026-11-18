import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: unknown) {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
      convert: true,
    });

    if (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message),
      });
    }

    return validatedValue;
  }
}

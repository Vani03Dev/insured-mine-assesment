import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export const ApiFile = (filename: string): MethodDecorator =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [filename]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );

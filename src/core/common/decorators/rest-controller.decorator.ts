import { Controller, applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { STATUS_CODES } from 'http';

interface RestControllerOption {
  tag: string;
  path?: string;
}

export const RestController = ({ tag, path }: RestControllerOption): any =>
  applyDecorators(
    Controller(path),
    ApiTags(tag),
    ApiInternalServerErrorResponse({
      description: STATUS_CODES.INTERNAL_SERVER_ERROR,
    }),
  );

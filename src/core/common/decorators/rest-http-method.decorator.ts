import {
  AmazonS3FileInterceptor,
  MulterExtendedOptions,
} from 'nestjs-multer-extended';
import { diskStorage } from 'multer';
import { ReasonPhrases } from 'http-status-codes';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  applyDecorators,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { IMPORT_FOLDER_PATH } from '@app/core/common/common.types';
import { ApiFile } from '@app/core/common/decorators';

interface RestHttpAction {
  path?: string;
  summary?: string;
  directory?: string;
}

export const RestGet = ({ path, summary }: RestHttpAction): MethodDecorator =>
  applyDecorators(
    Get(path),
    ApiOperation({ summary }),
    ApiOkResponse({ description: ReasonPhrases.OK }),
  );

export const RestPost = ({ path, summary }: RestHttpAction): MethodDecorator =>
  applyDecorators(
    Post(path),
    ApiOperation({ summary }),
    ApiUnprocessableEntityResponse({
      description: ReasonPhrases.UNPROCESSABLE_ENTITY,
    }),
  );

export const RestPatch = ({ path, summary }: RestHttpAction): MethodDecorator =>
  applyDecorators(
    Patch(path),
    ApiOperation({ summary }),
    ApiOkResponse({ description: ReasonPhrases.OK }),
    ApiNotFoundResponse({ description: ReasonPhrases.NOT_FOUND }),
    ApiUnprocessableEntityResponse({
      description: ReasonPhrases.UNPROCESSABLE_ENTITY,
    }),
  );

export const RestDelete = ({
  path,
  summary,
}: RestHttpAction): MethodDecorator =>
  applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    Delete(path),
    ApiOperation({ summary }),
    ApiOkResponse({ description: ReasonPhrases.NO_CONTENT }),
  );

export const RestPostUpload = ({
  path,
  summary,
}: RestHttpAction): MethodDecorator =>
  applyDecorators(
    RestPost({ path, summary }),
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({ destination: IMPORT_FOLDER_PATH }),
      }),
    ),
    ApiFile('file'),
  );

export const RestUploadWithTransform = (
  { path, summary }: RestHttpAction,
  localOption?: MulterExtendedOptions,
): MethodDecorator =>
  applyDecorators(
    RestPatch({ path, summary }),
    UseInterceptors(
      AmazonS3FileInterceptor('file', {
        ...localOption,
        dynamicPath: 'avatar',
        resize: { width: 250, height: 250 },
        randomFilename: true,
      }),
    ),
    ApiFile('file'),
  );

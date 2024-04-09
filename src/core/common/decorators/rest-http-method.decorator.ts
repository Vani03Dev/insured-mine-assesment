import {
  AmazonS3FileInterceptor,
  MulterExtendedOptions,
} from 'nestjs-multer-extended';
import { diskStorage } from 'multer';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
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
import {
  ErrorMessages,
  IMPORT_FOLDER_PATH,
} from '@app/core/common/common.types';
import { ApiFile } from '@app/core/common/decorators';
import { ApiException } from '@app/core/exceptions/api.exception';
import * as _ from 'lodash';
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
        storage: diskStorage({
          destination: IMPORT_FOLDER_PATH,
          filename: (req, file, callback) => {
            const originalname = file.originalname;
            const [name, ext] = originalname.split('.');
            callback(null, `${_.toLower(name.trim())}.${ext}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          return checkAllowedFileType(file.mimetype, callback);
        },
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

export const checkAllowedFileType = (mimeType: string, callback: any) => {
  const allowedMimeTypes = [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  if (!allowedMimeTypes.includes(mimeType)) {
    const error = new ApiException(
      ErrorMessages.INVALID_FILE_TYPE,
      StatusCodes.BAD_REQUEST,
    );

    return callback(error, false);
  }

  return callback(null, true);
};

export const IMPORT_FOLDER_PATH = './uploads';

export enum HttpErrorCode {
  REST_ERROR = 'error.apiError',
  REST_NOT_FOUND_ERROR = 'error.notFound',
  REST_REQUEST_TIMEOUT = 'error.apiTimeoutError',
  REST_THROTTLE_ERROR = 'error.apiThrottleError',
  REST_CONSTRAINT_ERROR = 'error.constraintError',
  REST_SERVER_ERROR = 'error.serverError',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Roles {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export const AllowedMimeTypes = {
  CSV: 'text/csv',
  SPREAD_SHEET:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  EXCEL: 'application/vnd.ms-excel',
};

export const ErrorMessages = {
  INVALID_FILE_TYPE: 'Only text/csv or excel file are allowed!',
};

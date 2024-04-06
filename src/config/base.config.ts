export const IS_DEBUG = process.env.DEBUG;
export const IS_QA_STAGE = process.env.STAGE === 'qa';
export const IS_LOCAL_STAGE = process.env.STAGE === 'local';
export const IS_DEV_STAGE = process.env.STAGE === 'development';
export const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

export const baseConfig = (): Record<string, any> => {
  return {
    stage: process.env.STAGE,
    debug: process.env.DEBUG,
    env: process.env.NODE_ENV,
    logFolder: process.env.LOG_FOLDER,
    level: process.env.LOG_LEVEL || 'debug',
    app: {
      name: process.env.SERVER_NAME,
      port: parseInt(process.env.SERVER_PORT, 10) || 3000,
      debugPort: process.env.SERVER_DEBUG_PORT,
      webSocketPort: process.env.SERVER_WEB_SOCKET_PORT,
      allowedHost: process.env.SERVER_ALLOWED_HOST,
      timezone: process.env.SERVER_TZ,
    },

    swagger: {
      host: process.env.SWAGGER_HOST,
    },
    authBasic: {
      user: process.env.AUTH_BASIC_USER,
      password: process.env.AUTH_BASIC_PASS,
    },
    mongoDb: {
      url: process.env.MONGO_URI,
    },
  };
};

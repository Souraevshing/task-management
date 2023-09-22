import * as joi from '@hapi/joi';

// validate env variables and throw error if any of these properties doesn't exist
export const validationSchema = joi.object({
  STAGE: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().default(5432).required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
  JWT_SECRET: joi.string().required(),
});

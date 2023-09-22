"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const joi = require("@hapi/joi");
exports.validationSchema = joi.object({
    STAGE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().default(5432).required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    JWT_SECRET: joi.string().required(),
});
//# sourceMappingURL=config.schema.js.map
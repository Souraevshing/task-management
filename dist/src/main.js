"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    await app.listen(PORT);
    logger.log(`Server running on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
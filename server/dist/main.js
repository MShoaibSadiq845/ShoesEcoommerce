"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const allowedOrigins = [
                'http://localhost:3000',
                'http://localhost:3001',
                'https://shoesecommerce-rho.vercel.app',
            ];
            const isVercelDomain = /\.vercel\.app$/.test(origin);
            const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
            if (allowedOrigins.includes(origin) || isVercelDomain || isLocalhost) {
                callback(null, true);
            }
            else {
                callback(null, true);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Authorization,Accept',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 NestJS Backend running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
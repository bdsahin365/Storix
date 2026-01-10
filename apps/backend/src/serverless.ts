import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

async function bootstrap() {
    if (!app) {
        app = await NestFactory.create(AppModule);

        // Add request logging middleware
        app.use((req: any, res: any, next: any) => {
            console.log(`📥 ${req.method} ${req.url}`);
            if (req.headers.authorization) {
                const token = req.headers.authorization.substring(0, 50);
                console.log(`   Auth: ${token}...`);
            } else {
                console.log(`   Auth: ❌ No Authorization header`);
            }
            next();
        });

        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
            allowedHeaders: 'Content-Type, Accept, Authorization',
        });

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }));

        await app.init();
    }
    return app;
}

export default async (req, res) => {
    const server = await bootstrap();
    return server.getHttpAdapter().getInstance()(req, res);
};

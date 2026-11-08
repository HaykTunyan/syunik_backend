import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AdminGuard } from './admin.guard.js';

// Global, so any module can use @UseGuards(AdminGuard) without importing this.
@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => {
                const secret = process.env.JWT_SECRET;
                if (!secret || secret.length < 32) {
                    throw new Error(
                        'JWT_SECRET is missing or too short (use at least 32 characters)',
                    );
                }
                return { secret, signOptions: { expiresIn: '12h' } };
            },
        }),
        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 20 }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, AdminGuard],
    exports: [JwtModule, AdminGuard],
})
export class AuthModule { }
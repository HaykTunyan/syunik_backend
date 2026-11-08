import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import { AdminGuard } from './admin.guard.js';
import { LoginDto } from './dto/login.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    // At most 5 login attempts per minute from the same IP
    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { limit: 5, ttl: 60_000 } })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto);
    }

    // Handy to check that a token works
    @ApiBearerAuth()
    @UseGuards(AdminGuard)
    @Get('me')
    me(@Req() req: { user: { email: string; role: string } }) {
        return { email: req.user.email, role: req.user.role };
    }
}
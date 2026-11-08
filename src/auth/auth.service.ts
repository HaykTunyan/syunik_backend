import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

// Compared against when the email does not exist, so a wrong email and a
// wrong password take about the same time (no account guessing).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) { }

    async login({ email, password }: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        const valid = await bcrypt.compare(
            password,
            user?.passwordHash ?? DUMMY_HASH,
        );
        if (!user || !valid) throw new UnauthorizedException('Invalid credentials');

        const accessToken = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
        });
        return { accessToken, user: { email: user.email, role: user.role } };
    }
}
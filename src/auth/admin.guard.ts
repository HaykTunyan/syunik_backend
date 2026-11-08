import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';

// Use on any route that only an admin may call:
//   @UseGuards(AdminGuard)
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const [type, token] = String(req.headers.authorization ?? '').split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException();

    let payload: { sub: number };
    try {
      payload = await this.jwt.verifyAsync<{ sub: number }>(token);
    } catch {
      throw new UnauthorizedException();
    }

    // Look the user up every time, so removing admin rights takes effect
    // immediately instead of when the token expires.
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException();
    if (user.role !== 'ADMIN') throw new ForbiddenException();

    req.user = { id: user.id, email: user.email, role: user.role };
    return true;
  }
}
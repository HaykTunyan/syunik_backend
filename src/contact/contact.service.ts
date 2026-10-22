import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateContactDto } from './dto/contact.dto.js';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) { }

    async create({ name, email, message, website }: CreateContactDto) {
        // Honeypot filled in: act like it worked, but store nothing.
        if (website) return { ok: true };

        await this.prisma.contactMessage.create({
            data: { name, email, message },
        });
        return { ok: true };
    }
}
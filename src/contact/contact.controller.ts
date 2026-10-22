import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/contact.dto.js';

@ApiTags('contact')
@Controller('contact')
@UseGuards(ThrottlerGuard)
export class ContactController {
    constructor(private readonly contact: ContactService) { }

    // At most 3 messages per minute from the same IP
    @Throttle({ default: { limit: 3, ttl: 60_000 } })
    @Post()
    create(@Body() dto: CreateContactDto) {
        return this.contact.create(dto);
    }
}
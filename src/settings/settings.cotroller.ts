import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service.js';
import { SettingsQueryDto } from './dto/settings.dto.js';

@ApiTags('settings')
@Controller()
export class SettingsController {
    constructor(private readonly settings: SettingsService) { }

    @Get('settings/public')
    getPublic(@Query() { lang }: SettingsQueryDto) {
        return this.settings.getPublic(lang);
    }

    @Get('stats')
    getStats() {
        return this.settings.getStats();
    }
}
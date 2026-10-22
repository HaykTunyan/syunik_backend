import { Module } from '@nestjs/common';
import { SettingsController } from './settings.cotroller.js';
import { SettingsService } from './settings.service.js';

@Module({
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule { }
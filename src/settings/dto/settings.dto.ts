import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import type { Lang } from '../../common/lang.js';

export class SettingsQueryDto {
    @ApiPropertyOptional({ enum: ['en', 'hy'], default: 'en' })
    @IsOptional()
    @IsIn(['en', 'hy'])
    lang: Lang = 'en';
}
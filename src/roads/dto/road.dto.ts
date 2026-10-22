import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import type { Lang } from '../../common/lang.js';

export class RoadQueryDto {
    @ApiPropertyOptional({ enum: ['en', 'hy'], default: 'en' })
    @IsOptional()
    @IsIn(['en', 'hy'])
    lang: Lang = 'en';
}
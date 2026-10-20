import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import type { Lang } from '../../common/lang.js';

export const PLACE_CATEGORIES = [
  'MONASTERY',
  'FORTRESS',
  'NATURE',
  'BRIDGE',
  'CAVE',
  'VIEWPOINT',
  'OBSERVATORY',
  'MONUMENT',
  'WATERFALL',
  'TOWN',
  'OTHER',
] as const;

export type PlaceCategoryName = (typeof PLACE_CATEGORIES)[number];

// "?mostVisited=true" arrives as a string, so convert it to a boolean.
const toBool = ({ value }: { value: unknown }) =>
  value === undefined ? undefined : value === 'true' || value === true;

export class PlaceLangDto {
  @ApiPropertyOptional({ enum: ['en', 'hy'], default: 'en' })
  @IsOptional()
  @IsIn(['en', 'hy'])
  lang: Lang = 'en';
}

export class QueryPlacesDto extends PlaceLangDto {
  @ApiPropertyOptional({ description: 'City slug, e.g. kapan' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ enum: PLACE_CATEGORIES })
  @IsOptional()
  @IsIn(PLACE_CATEGORIES)
  category?: PlaceCategoryName;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  mostVisited?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  historical?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @Transform(toBool)
  @IsBoolean()
  featured?: boolean;
}
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import type { Lang } from '../../common/lang.js';

export class CreateCityDto {
  @IsString() @Matches(/^[a-z0-9-]+$/) slug!: string;
  @IsString() nameEn!: string;
  @IsOptional() @IsString() nameHy?: string;
  @IsString() taglineEn!: string;
  @IsOptional() @IsString() taglineHy?: string;
  @IsNumber() @Min(0) areaKm2!: number;
  @IsString() foundedEn!: string;
  @IsOptional() @IsString() foundedHy?: string;
  @IsInt() @Min(0) population!: number;
  @IsLatitude() latitude!: number;
  @IsLongitude() longitude!: number;

  @IsOptional() @IsString() heroImage?: string;
  @IsOptional() @IsString() climateEn?: string;
  @IsOptional() @IsString() climateHy?: string;
  @IsOptional() @IsString() bestVisitEn?: string;
  @IsOptional() @IsString() bestVisitHy?: string;
  @IsOptional() @IsString() historyEn?: string;
  @IsOptional() @IsString() historyHy?: string;

  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateCityDto extends PartialType(CreateCityDto) { }

export class LangQueryDto {
  @ApiPropertyOptional({ enum: ['en', 'hy'], default: 'en' })
  @IsOptional()
  @IsIn(['en', 'hy'])
  lang: Lang = 'en';
}
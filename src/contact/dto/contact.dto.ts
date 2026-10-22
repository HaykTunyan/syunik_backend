import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value;

export class CreateContactDto {
    @Transform(trim)
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name!: string;

    @Transform(trim)
    @IsEmail()
    @MaxLength(200)
    email!: string;

    @Transform(trim)
    @IsString()
    @MinLength(10)
    @MaxLength(2000)
    message!: string;

    // Honeypot: hidden in the form, real visitors leave it empty.
    // Bots tend to fill every field.
    @ApiPropertyOptional({ description: 'Leave empty (spam trap)' })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    website?: string;
}
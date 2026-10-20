import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service.js';
import { CreateCityDto, LangQueryDto, UpdateCityDto } from './dto/create-city.dto.js';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly cities: CitiesService) { }

  @Get()
  findAll(@Query() { lang }: LangQueryDto) {
    return this.cities.findAll(lang);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query() { lang }: LangQueryDto) {
    return this.cities.findDetail(slug, lang);
  }

  // Admin routes: will be locked behind JWT on the auth day
  @Post()
  create(@Body() dto: CreateCityDto) {
    return this.cities.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCityDto) {
    return this.cities.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cities.remove(id);
  }
}
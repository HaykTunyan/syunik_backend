import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlacesService } from './places.service.js';
import { PlaceLangDto, QueryPlacesDto } from './dto/place.dto.js';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly places: PlacesService) { }

  @Get()
  findAll(@Query() query: QueryPlacesDto) {
    return this.places.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string, @Query() { lang }: PlaceLangDto) {
    return this.places.findBySlug(slug, lang);
  }
}
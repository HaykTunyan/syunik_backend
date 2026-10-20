import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlacesService } from './places.service.js';
import { PlaceLangDto } from './dto/place.dto.js';

@ApiTags('map')
@Controller('map')
export class MapController {
  constructor(private readonly places: PlacesService) { }

  @Get('markers')
  markers(@Query() { lang }: PlaceLangDto) {
    return this.places.markers(lang);
  }
}
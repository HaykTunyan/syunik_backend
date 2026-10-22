import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoadService } from './road.service.js';
import { RoadQueryDto } from './dto/road.dto.js';

@ApiTags('road')
@Controller('road')
export class RoadController {
    constructor(private readonly road: RoadService) { }

    @Get()
    getPage(@Query() { lang }: RoadQueryDto) {
        return this.road.getPage(lang);
    }
}
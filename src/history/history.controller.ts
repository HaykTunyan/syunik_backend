import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service.js';
import { HistoryQueryDto } from './dto/history.dto.js';

@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getHistory(@Query() query: HistoryQueryDto) {
    return this.historyService.getHistory(query);
  }
}

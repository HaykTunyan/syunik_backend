import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller.js';
import { CitiesService } from './cities.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CitiesController],
  providers: [CitiesService]
})
export class CitiesModule {}

import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';
import { CreateCityDto } from './dto/create-city.dto.js';
import { UpdateCityDto } from './dto/update-city.dto.js';

@Injectable()
export class CitiesService {
  private readonly logger = new Logger(CitiesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    try {
      return await this.prisma.city.create({
        data: createCityDto,
      });
    } catch (error) {
      this.logger.error('Error creating city:', error);
      throw new InternalServerErrorException('Failed to create city');
    }
  }

  async findAll() {
    try {
      return await this.prisma.city.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      this.logger.error('Error fetching cities:', error);
      throw new InternalServerErrorException('Failed to fetch cities');
    }
  }

  async findOne(id: number) {
    try {
      const city = await this.prisma.city.findUnique({
        where: { id },
      });

      if (!city) {
        throw new NotFoundException(`City with ID ${id} not found`);
      }

      return city;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error fetching city ${id}:`, error);
      throw new InternalServerErrorException('Failed to fetch city');
    }
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    try {
      return await this.prisma.city.update({
        where: { id },
        data: updateCityDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`City with ID ${id} not found`);
      }
      this.logger.error(`Error updating city ${id}:`, error);
      throw new InternalServerErrorException('Failed to update city');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.city.delete({
        where: { id },
      });
      return { message: `City with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`City with ID ${id} not found`);
      }
      this.logger.error(`Error deleting city ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete city');
    }
  }
}

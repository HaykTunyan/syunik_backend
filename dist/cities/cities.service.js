var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CitiesService_1;
import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@prisma/client';
let CitiesService = CitiesService_1 = class CitiesService {
    prisma;
    logger = new Logger(CitiesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCityDto) {
        try {
            return await this.prisma.city.create({
                data: createCityDto,
            });
        }
        catch (error) {
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
        }
        catch (error) {
            this.logger.error('Error fetching cities:', error);
            throw new InternalServerErrorException('Failed to fetch cities');
        }
    }
    async findOne(id) {
        try {
            const city = await this.prisma.city.findUnique({
                where: { id },
            });
            if (!city) {
                throw new NotFoundException(`City with ID ${id} not found`);
            }
            return city;
        }
        catch (error) {
            if (error instanceof NotFoundException)
                throw error;
            this.logger.error(`Error fetching city ${id}:`, error);
            throw new InternalServerErrorException('Failed to fetch city');
        }
    }
    async update(id, updateCityDto) {
        try {
            return await this.prisma.city.update({
                where: { id },
                data: updateCityDto,
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`City with ID ${id} not found`);
            }
            this.logger.error(`Error updating city ${id}:`, error);
            throw new InternalServerErrorException('Failed to update city');
        }
    }
    async remove(id) {
        try {
            await this.prisma.city.delete({
                where: { id },
            });
            return { message: `City with ID ${id} deleted successfully` };
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`City with ID ${id} not found`);
            }
            this.logger.error(`Error deleting city ${id}:`, error);
            throw new InternalServerErrorException('Failed to delete city');
        }
    }
};
CitiesService = CitiesService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CitiesService);
export { CitiesService };
//# sourceMappingURL=cities.service.js.map
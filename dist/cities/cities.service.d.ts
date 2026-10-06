import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { UpdateCityDto } from './dto/update-city.dto.js';
export declare class CitiesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createCityDto: CreateCityDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCityDto: UpdateCityDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

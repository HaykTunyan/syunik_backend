import { CitiesService } from './cities.service.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { UpdateCityDto } from './dto/update-city.dto.js';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(createCityDto: CreateCityDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCityDto: UpdateCityDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}

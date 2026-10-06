var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { UpdateCityDto } from './dto/update-city.dto.js';
let CitiesController = class CitiesController {
    citiesService;
    constructor(citiesService) {
        this.citiesService = citiesService;
    }
    create(createCityDto) {
        return this.citiesService.create(createCityDto);
    }
    findAll() {
        return this.citiesService.findAll();
    }
    findOne(id) {
        return this.citiesService.findOne(id);
    }
    update(id, updateCityDto) {
        return this.citiesService.update(id, updateCityDto);
    }
    remove(id) {
        return this.citiesService.remove(id);
    }
};
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCityDto]),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "create", null);
__decorate([
    Get(),
    HttpCode(HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    HttpCode(HttpStatus.OK),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    HttpCode(HttpStatus.OK),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateCityDto]),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.OK),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "remove", null);
CitiesController = __decorate([
    Controller('cities'),
    __metadata("design:paramtypes", [CitiesService])
], CitiesController);
export { CitiesController };
//# sourceMappingURL=cities.controller.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller.js';
import { CitiesService } from './cities.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
let CitiesModule = class CitiesModule {
};
CitiesModule = __decorate([
    Module({
        imports: [PrismaModule],
        controllers: [CitiesController],
        providers: [CitiesService]
    })
], CitiesModule);
export { CitiesModule };
//# sourceMappingURL=cities.module.js.map
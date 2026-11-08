import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { CitiesModule } from './cities/cities.module.js';
import { ContactModule } from './contact/contact.module.js';
import { HistoryModule } from './history/history.module.js';
import { PlacesModule } from './places/places.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RoadModule } from './roads/road.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { ShopModule } from './shop/shop.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CitiesModule,
    ContactModule,
    HistoryModule,
    PlacesModule,
    RoadModule,
    SettingsModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
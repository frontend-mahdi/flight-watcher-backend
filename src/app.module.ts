import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightService } from './flight/flight.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WatcherService } from './watcher/watcher.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FlightService, WatcherService],
})
export class AppModule {}

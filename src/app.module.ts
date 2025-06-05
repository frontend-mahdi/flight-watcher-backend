import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightService } from './flight/flight.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WatcherService } from './watcher/watcher.service';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [ScheduleModule.forRoot(), SubscriptionModule],
  controllers: [AppController],
  providers: [AppService, FlightService, WatcherService, SubscriptionService],
})
export class AppModule {}

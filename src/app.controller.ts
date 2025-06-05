import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WatchDto } from './watch.dto';
import { FlightService } from './flight/flight.service';
import { SubscriptionService } from './subscription/subscription.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly flightService: FlightService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  getHello(): string {
    return '✈️ Flight Watcher Backend is running!';
  }

  @Post('watch')
  async watchFlight(@Body() body: WatchDto) {
    const result = await this.flightService.checkFare(body);

    if (!result.result || result.result.length === 0) {
      return {
        message: 'No flights found for this date.',
      };
    }

    const cheapest = result.result[0]; // it's already sorted by cheapest

    return {
      message: 'Flight found!',
      price: cheapest.cheapestPrice,
      airline: cheapest.airline,
      departureDate: cheapest.departureDate,
    };
  }

  @Post('subscribe')
  subscribe(@Body() body: any) {
    const { subscription } = body;
    this.subscriptionService.addSubscription(subscription);
    return { message: '✅ Subscribed to push notifications' };
  }
}

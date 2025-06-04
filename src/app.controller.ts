import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WatchDto } from './watch.dto';
import { FlightService } from './flight/flight.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly flightService: FlightService,
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

  private subscriptions = [];

  @Post('subscribe')
  subscribe(@Body() subscription: any) {
    this.subscriptions.push(subscription);
    return { message: 'Subscribed!' };
  }
}

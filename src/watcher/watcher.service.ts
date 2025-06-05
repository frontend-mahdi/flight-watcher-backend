import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FlightService } from '../flight/flight.service';
import * as webpush from 'web-push';
import { SubscriptionService } from 'src/subscription/subscription.service';

// Set VAPID keys here (move to .env later)
webpush.setVapidDetails(
  'mailto:your@email.com',
  'BMko2JueHrgv3ri-9ozAiFZau5S9W9l4aNQ8CJp_l8MavgdV-3_Yrcm5sSyhN2DQ0XWKywhUIXFzmM1MeK9UTZI',
  'HY2CLAPBiH2t8K0QkRGdKU5izEGpe0h6TQxmYBaHFTY',
);

@Injectable()
export class WatcherService {
  private readonly logger = new Logger(WatcherService.name);

  constructor(
    private flightService: FlightService,
    private subscriptionService: SubscriptionService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleFlightCheck() {
    const dto = {
      originLocationCode: 'thr',
      destinationLocationCode: 'njf',
      departureDate: '2025-06-08',
      lookUpType: 3,
    };

    try {
      const result = await this.flightService.checkFare(dto);

      if (result.result?.length > 0) {
        const cheapest = result.result[0];
        this.logger.log(
          `🎯 Flight found: ${cheapest.airline} - ${cheapest.cheapestPrice} on ${cheapest.departureDate}`,
        );

        // ✨ Simulate push subscription for testing

        const allSubscriptions = this.subscriptionService.getAll();
        for (const sub of allSubscriptions) {
          await webpush.sendNotification(
            sub,
            JSON.stringify({
              title: '✈️ Flight Available!',
              body: `Airline ${cheapest.airline}, Price: ${cheapest.cheapestPrice}`,
            }),
          );
        }
      } else {
        this.logger.log('❌ No flights found.');
      }
    } catch (error) {
      this.logger.error(
        '💥 Error checking flight or sending notification',
        error,
      );
    }
  }
}

// src/subscription/subscription.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  private subscriptions: any[] = [];

  addSubscription(sub: any) {
    this.subscriptions.push(sub);
  }

  getAll() {
    return this.subscriptions;
  }
}

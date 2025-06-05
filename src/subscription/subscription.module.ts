// src/subscription/subscription.module.ts
import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Module({
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}

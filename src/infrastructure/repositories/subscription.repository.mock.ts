import type { ISubscriptionRepository } from '@/application/repositories/subscription.repository.interface';

export class MockSubscriptionRepository implements ISubscriptionRepository {
  private _subscriptions: string[];

  constructor() {
    this._subscriptions = [];
  }

  async createSubscription(email: string): Promise<void> {
    this._subscriptions.push(email);
  }

  async getSubscriptionByEmail(email: string): Promise<boolean> {
    return this._subscriptions.includes(email);
  }

  async getAllSubscriptions(): Promise<string[]> {
    return this._subscriptions;
  }
}

import type { ISubscriptionRepository } from '@/application/repositories/subscription.repository.interface';
import { sql } from '@/db';

export class SubscriptionRepository implements ISubscriptionRepository {
  async createSubscription(email: string): Promise<void> {
    await sql`INSERT INTO subscriptions (email) VALUES (${email})`;
  }

  async getSubscriptionByEmail(email: string): Promise<boolean> {
    const response = await sql`SELECT 1 FROM subscriptions WHERE email = ${email} LIMIT 1`;
    return response.length > 0;
  }

  async getAllSubscriptions(): Promise<string[]> {
    const response = await sql`SELECT email FROM subscriptions`;
    return response.map((row) => row.email);
  }
}

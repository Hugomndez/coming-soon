export interface ISubscriptionRepository {
  createSubscription(email: string): Promise<void>;
  getSubscriptionByEmail(email: string): Promise<boolean>;
  getAllSubscriptions(): Promise<string[]>;
}

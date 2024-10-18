import { SubscriptionRepository } from '@/infrastructure/repositories/subscription.repository';
import { MockSubscriptionRepository } from '@/infrastructure/repositories/subscription.repository.mock';

function selectRepository() {
  if (process.env.NODE_ENV === 'test') {
    return new MockSubscriptionRepository();
  }
  return new SubscriptionRepository();
}

export const DatabaseModule = selectRepository();

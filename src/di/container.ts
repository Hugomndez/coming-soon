import { CreateSubscriptionUseCase } from '@/application/use-cases/subscription/create-subscription.use-case';
import { MockSubscriptionRepository } from '@/infrastructure/repositories/subscription.repository.mock';
import { SubscriptionController } from '@/interface-adapters/controllers/subscription/subscription.controller';

const DB = new MockSubscriptionRepository();
const createSubscriptionUseCase = new CreateSubscriptionUseCase(DB);
export const subscriptionController = new SubscriptionController(createSubscriptionUseCase);

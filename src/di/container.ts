import { CreateSubscriptionUseCase } from '@/application/use-cases/subscription/create-subscription.use-case';
import { SubscriptionController } from '@/interface-adapters/controllers/subscription/subscription.controller';
import { DatabaseModule } from './modules/database.module';

const createSubscriptionUseCase = new CreateSubscriptionUseCase(DatabaseModule);
export const subscriptionController = new SubscriptionController(createSubscriptionUseCase);

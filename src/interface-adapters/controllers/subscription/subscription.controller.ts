import type { CreateSubscriptionUseCase } from '@/application/use-cases/subscription/create-subscription.use-case';
import { EmailAlreadySubscribedError, ValidationError } from '@/entities/errors/common';
import { subscriptionSchema } from '@/entities/models/subscription';

export class SubscriptionController {
  private _createSubscriptionUseCase: CreateSubscriptionUseCase;

  constructor(createSubscriptionUseCase: CreateSubscriptionUseCase) {
    this._createSubscriptionUseCase = createSubscriptionUseCase;
  }

  async subscribe(payload: unknown): Promise<void> {
    const { data, error } = subscriptionSchema.safeParse(payload);

    if (error) {
      const { fieldErrors } = error.flatten();
      const fieldBlurs = Object.fromEntries(Object.keys(fieldErrors).map((name) => [name, true]));

      throw new ValidationError('Invalid form data', fieldErrors, fieldBlurs);
    }

    try {
      await this._createSubscriptionUseCase.execute(data.email);
    } catch (error) {
      if (error instanceof EmailAlreadySubscribedError) {
        throw new ValidationError(error.message, { email: [error.message] }, { email: true });
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

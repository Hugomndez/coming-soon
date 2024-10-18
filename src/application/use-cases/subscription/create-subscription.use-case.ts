import type { ISubscriptionRepository } from '@/application/repositories/subscription.repository.interface';
import { EmailAlreadySubscribedError } from '@/entities/errors/common';

export class CreateSubscriptionUseCase {
  private _subscriptionRepository: ISubscriptionRepository;

  constructor(subscriptionRepository: ISubscriptionRepository) {
    this._subscriptionRepository = subscriptionRepository;
  }

  // HINT: this is where you'd do authorization checks - is this user authorized to create a todo
  // for example: free users are allowed only 5 todos, throw an UnauthorizedError if more than 5

  async execute(email: string) {
    if (await this._subscriptionRepository.getSubscriptionByEmail(email)) {
      throw new EmailAlreadySubscribedError('Email already subscribed!');
    }

    await this._subscriptionRepository.createSubscription(email);
  }
}

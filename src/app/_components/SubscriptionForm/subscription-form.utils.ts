import type { SubscriptionState } from '@/entities/models/subscription';
import { subscriptionSchema } from '@/entities/models/subscription';

export const validateForm = (
  data: SubscriptionState['form']['data']
): {
  fieldErrors: SubscriptionState['form']['fieldErrors'];
  status: SubscriptionState['status'];
} => {
  const { error } = subscriptionSchema.safeParse(data);

  if (error) {
    const { fieldErrors } = error.flatten();
    return {
      fieldErrors: fieldErrors,
      status: 'error',
    };
  }

  return {
    fieldErrors: {},
    status: 'valid',
  };
};

export const blurFields = (
  data: SubscriptionState['form']['fieldErrors']
): SubscriptionState['form']['fieldBlurs'] => {
  const inputNames = Object.keys(data);

  return Object.fromEntries(inputNames.map((name) => [name, true]));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import type { FlattenedErrors, SubscriptionForm } from './subscription-form.schema';
import subscriptionFormSchema from './subscription-form.schema';
import type { SubscriptionState } from './subscription-form.types';

export const validateForm = (
  data: SubscriptionForm
): { fieldErrors: FlattenedErrors['fieldErrors']; status: SubscriptionState['status'] } => {
  const { error } = subscriptionFormSchema.safeParse(data);

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
  data: FlattenedErrors['fieldErrors']
): SubscriptionState['form']['fieldBlurs'] => {
  const inputNames = Object.keys(data);

  return Object.fromEntries(inputNames.map((name) => [name, true]));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

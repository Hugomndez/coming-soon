'use server';

import { ValidationError } from '@/entities/errors/common';
import { createSubscriptionController } from '@/interface-adapters/controllers/subscriptions/create-subscription.controller';
import type { SubscriptionState } from './subscription-form.types';
import { blurFields } from './subscription-form.utils';

export default async function subscriptionAction(
  _: unknown,
  formData: FormData
): Promise<SubscriptionState> {
  const data = Object.fromEntries(formData.entries());

  try {
    await createSubscriptionController(data);
  } catch (err) {
    if (err instanceof ValidationError) {
      const blurredFields = blurFields(err.fieldErrors);

      return {
        status: 'error',
        message: 'Failed to subscribe. Please try again later.',
        form: {
          data: data as unknown as SubscriptionState['form']['data'],
          fieldErrors: err.fieldErrors,
          fieldBlurs: blurredFields,
        },
      };
    }
  }

  return {
    status: 'success',
    message: 'You have successfully subscribed!',
    form: {
      data: { email: '' },
      fieldErrors: {},
      fieldBlurs: {},
    },
  };
}

'use server';

import { subscriptionController } from '@/di/container';
import { ValidationError } from '@/entities/errors/common';
import type { SubscriptionState } from '@/entities/models/subscription';
import { blurFields } from './utils';

export default async function subscriptionAction(
  _: unknown,
  formData: FormData
): Promise<SubscriptionState> {
  const data = Object.fromEntries(formData.entries());

  try {
    await subscriptionController.subscribe(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      const blurredFields = blurFields(error.fieldErrors);

      return {
        status: 'error',
        message: error.message,
        form: {
          data: data as unknown as SubscriptionState['form']['data'],
          fieldErrors: error.fieldErrors,
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

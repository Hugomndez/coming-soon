'use server';

import { subscriptionController } from '@/di/container';
import { ValidationError } from '@/entities/errors/common';
import type { SubscriptionState } from '@/entities/models/subscription';

async function subscriptionAction(_: unknown, formData: FormData): Promise<SubscriptionState> {
  const rawData = Object.fromEntries(formData.entries()) as unknown;

  try {
    await subscriptionController.subscribe(rawData);

    return {
      status: 'success',
      message: 'You have successfully subscribed!',
      form: {
        data: { email: '' },
        fieldErrors: {},
        fieldBlurs: {},
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        status: 'field-error',
        message: error.message,
        form: {
          data: rawData as SubscriptionState['form']['data'],
          fieldErrors: error.fieldErrors,
          fieldBlurs: error.fieldBlurs,
        },
      };
    } else {
      return {
        status: 'error',
        message: 'An error occurred while subscribing. Please try again later.',
        form: {
          data: { email: '' },
          fieldErrors: {},
          fieldBlurs: {},
        },
      };
    }
  }
}

export default subscriptionAction;

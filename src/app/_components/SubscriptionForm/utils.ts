import type { FormEventTarget, SubscriptionState } from '@/entities/models/subscription';
import { subscriptionSchema } from '@/entities/models/subscription';

export const validateForm = (
  data: FormEventTarget
): {
  fieldErrors: SubscriptionState['form']['fieldErrors'];
  status: SubscriptionState['status'];
} => {
  const { error } = subscriptionSchema.safeParse({ [data.name]: data.value });

  if (error) {
    return {
      fieldErrors: error.flatten().fieldErrors,
      status: 'field-error',
    };
  }

  return {
    fieldErrors: {},
    status: 'valid',
  };
};

'use server';

import { addSubscriptionSchema } from '../_schemas/addSubscriptionSchema';
import { AddSubscriptionState } from '../_types';
import { convertZodErrors } from '../_utils';

export default async function addSubscriptionAction(
  prevState: AddSubscriptionState,
  formData: FormData
): Promise<AddSubscriptionState> {
  const subscriptionData = {
    email: formData.get('email') as string,
  };

  const validationResult = addSubscriptionSchema.safeParse(subscriptionData);

  if (!validationResult.success) {
    const errors = convertZodErrors(validationResult.error);

    return {
      message: '',
      errors,
      data: subscriptionData,
      blurs: Object.fromEntries(Object.keys(subscriptionData).map((key) => [key, true])),
    };
  }

  return {
    message: 'Subscribed!',
    errors: {},
    blurs: {},
    data: {
      email: '',
    },
  };
}

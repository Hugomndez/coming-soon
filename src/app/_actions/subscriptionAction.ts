'use server';

import { subscriptionSchema } from '../_schemas/subscriptionSchema';
import { SubscriptionState } from '../_types';
import { blurAllFormFields, convertZodErrors } from '../_utils';

export default async function subscriptionAction(
  prevState: SubscriptionState,
  formData: FormData
): Promise<SubscriptionState> {
  const data = {
    email: formData.get('email') as string,
  };

  console.log(data);

  const parsedResult = subscriptionSchema.safeParse(data);

  if (!parsedResult.success) {
    const errors = convertZodErrors(parsedResult.error);
    const blurs = blurAllFormFields(subscriptionSchema.shape);

    return {
      message: '',
      errors,
      data,
      blurs,
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

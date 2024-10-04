'use server';
import subscriptionSchema from './subscription-form.schema';
import type { SubscriptionState } from './subscription-form.types';
import { blurAllFormFields, convertZodErrors } from './subscription-form.utils';

export default async function subscriptionAction(
  prevState: SubscriptionState,
  formData: FormData
): Promise<SubscriptionState> {
  const formPayload = {
    email: formData.get('email') as string,
  };

  const parsedResult = subscriptionSchema.safeParse(formPayload);

  if (!parsedResult.success) {
    const errors = convertZodErrors(parsedResult.error);
    const blurs = blurAllFormFields(subscriptionSchema.shape);

    return {
      status: 'error',
      message: '',
      errors,
      form: formPayload,
      blurs,
    };
  }

  return {
    status: 'success',
    message: 'Subscribed!',
    errors: {},
    blurs: {},
    form: {
      email: '',
    },
  };
}

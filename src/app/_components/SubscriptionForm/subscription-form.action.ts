'use server';
import subscriptionFormSchema from './subscription-form.schema';
import type { SubscriptionState } from './subscription-form.types';
import { blurAllFormFields, convertZodErrors } from './subscription-form.utils';

export default async function subscriptionAction(
  prevState: SubscriptionState,
  formData: FormData
): Promise<SubscriptionState> {
  const formPayload = {
    email: formData.get('email') as string,
  };

  const parsedResult = subscriptionFormSchema.safeParse(formPayload);

  if (!parsedResult.success) {
    const errors = convertZodErrors(parsedResult.error);
    const blurs = blurAllFormFields(subscriptionFormSchema.shape);

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

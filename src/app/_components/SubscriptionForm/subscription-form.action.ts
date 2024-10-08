'use server';
import subscriptionFormSchema, { type SubscriptionForm } from './subscription-form.schema';
import { SubscriptionStatus, type SubscriptionState } from './subscription-form.types';
import { blurAllFormFields, formatZodErrors } from './subscription-form.utils';

export default async function subscriptionAction(
  prevState: SubscriptionState,
  formData: FormData
): Promise<SubscriptionState> {
  const formDataObject = Object.fromEntries(formData.entries());

  const validationResult = subscriptionFormSchema.safeParse(formDataObject);

  if (!validationResult.success) {
    const validationErrors = formatZodErrors(validationResult.error);
    const blurredFields = blurAllFormFields(subscriptionFormSchema.shape);

    return {
      status: SubscriptionStatus.Error,
      message: '',
      form: {
        data: formDataObject as SubscriptionForm,
        errors: validationErrors,
        blurs: blurredFields,
      },
    };
  }

  return {
    status: SubscriptionStatus.Success,
    message: 'Subscribed!',
    form: {
      data: { email: '' },
      errors: {},
      blurs: {},
    },
  };
}

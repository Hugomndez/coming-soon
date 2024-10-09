import type { ZodRawShape } from 'zod';
import subscriptionFormSchema from './subscription-form.schema';
import { SubscriptionStatus, type StringToBooleanMap } from './subscription-form.types';

export const validateForm = (data: unknown) => {
  const validationResult = subscriptionFormSchema.safeParse(data);
  if (!validationResult.success) {
    const { fieldErrors } = validationResult.error.flatten();
    return {
      fieldErrors,
      status: SubscriptionStatus.Error,
    };
  }
  return {
    fieldErrors: {},
    status: SubscriptionStatus.Valid,
  };
};

export const blurAllFormFields = (schema: ZodRawShape): StringToBooleanMap => {
  const inputNames = Object.keys(schema);

  return Object.fromEntries(inputNames.map((name) => [name, true]));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

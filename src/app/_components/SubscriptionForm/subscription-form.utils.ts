import { ZodError, ZodRawShape } from 'zod';
import subscriptionFormSchema from './subscription-form.schema';
import {
  SubscriptionStatus,
  type StringMap,
  type StringToBooleanMap,
} from './subscription-form.types';

export const validateForm = (data: unknown) => {
  const validationResult = subscriptionFormSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      errors: formatZodErrors(validationResult.error),
      status: SubscriptionStatus.Error,
    };
  }
  return {
    errors: {},
    status: SubscriptionStatus.Valid,
  };
};

export const formatZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};

export const blurAllFormFields = (schema: ZodRawShape): StringToBooleanMap => {
  const inputNames = Object.keys(schema);

  return Object.fromEntries(inputNames.map((name) => [name, true]));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

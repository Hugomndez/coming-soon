import type { FilteredFlattenedErrors, SubscriptionForm } from './subscription-form.schema';

export type SubscriptionState = {
  status: SubscriptionStatus;
  message: string;
  form: {
    data: SubscriptionForm;
    blurs: StringToBooleanMap;
  } & FilteredFlattenedErrors;
};

export enum SubscriptionStatus {
  Initial = 'initial',
  Error = 'error',
  Valid = 'valid',
  Success = 'success',
}

export type StringToBooleanMap = {
  [key: string]: boolean;
};

export type FormEventTarget = {
  [K in keyof SubscriptionForm]: { name: K; value: SubscriptionForm[K] };
}[keyof SubscriptionForm];

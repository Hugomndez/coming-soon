import type { FilteredFlattenedErrors, SubscriptionForm } from './subscription-form.schema';

export interface SubscriptionState {
  status: SubscriptionStatus;
  message: string;
  form: {
    data: SubscriptionForm;
    blurs: StringToBooleanMap;
  } & FilteredFlattenedErrors;
}

export enum SubscriptionStatus {
  Initial = 'initial',
  Error = 'error',
  Valid = 'valid',
  Success = 'success',
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

import { SubscriptionForm } from './subscription-form.schema';

export interface SubscriptionState {
  status: SubscriptionStatus;
  message: string;
  form: {
    data: SubscriptionForm;
    errors: StringMap;
    blurs: StringToBooleanMap;
  };
}

export enum SubscriptionStatus {
  Initial = 'initial',
  Error = 'error',
  Valid = 'valid',
  Success = 'success',
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

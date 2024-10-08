import { SubscriptionForm } from './subscription-form.schema';

export interface SubscriptionState {
  status: 'initial' | 'error' | 'valid' | 'success';
  message: string;
  errors: StringMap;
  blurs: StringToBooleanMap;
  form: SubscriptionForm;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

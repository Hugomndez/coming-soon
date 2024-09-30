import { SubscriptionSchema } from '../_schemas/subscriptionSchema';

export interface SubscriptionState {
  message: string;
  errors: StringMap;
  blurs: StringToBooleanMap;
  data: SubscriptionSchema;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

import { AddSubscriptionSchema } from '../_schemas/addSubscriptionSchema';

export interface AddSubscriptionState {
  errors?: StringMap;
  successMessage?: string;
  data?: AddSubscriptionSchema;
  blurs?: StringToBooleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

import { AddSubscriptionSchema } from '../_schemas/addSubscriptionSchema';

export interface AddSubscriptionState {
  message: string;
  errors: StringMap;
  blurs: StringToBooleanMap;
  data: AddSubscriptionSchema;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}

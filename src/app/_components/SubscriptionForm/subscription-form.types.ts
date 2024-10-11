import type { FlattenedErrors, SubscriptionForm } from './subscription-form.schema';

export type SubscriptionState = {
  status: 'initial' | 'error' | 'valid' | 'success';
  message: string;
  form: {
    data: SubscriptionForm;
    fieldErrors: FlattenedErrors['fieldErrors'];
    fieldBlurs: FieldBlurs;
  };
};

export type FieldBlurs = {
  [K in keyof FlattenedErrors['fieldErrors']]: boolean;
};

export type FormFocusEvent = {
  [K in keyof SubscriptionForm]: { name: K };
}[keyof SubscriptionForm];

export type FormEventTarget = {
  [K in keyof SubscriptionForm]: { name: K; value: SubscriptionForm[K] };
}[keyof SubscriptionForm];

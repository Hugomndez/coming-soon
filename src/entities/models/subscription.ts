import * as z from 'zod/v3';

export const subscriptionSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type FieldErrors = z.inferFlattenedErrors<typeof subscriptionSchema>['fieldErrors'];

export type FieldBlurs = {
  [K in keyof FieldErrors]: boolean;
};

export type FormEventTarget = {
  [K in keyof SubscriptionInput]: {
    name: K;
    value: SubscriptionInput[K];
  };
}[keyof SubscriptionInput];

export type SubscriptionState = {
  status: 'initial' | 'field-error' | 'valid' | 'success' | 'error';
  message: string;
  form: {
    data: SubscriptionInput;
    fieldErrors: FieldErrors;
    fieldBlurs: FieldBlurs;
  };
};

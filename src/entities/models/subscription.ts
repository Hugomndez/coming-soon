import * as z from 'zod/v3';

export const subscriptionSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
});

export type SubscriptionData = z.infer<typeof subscriptionSchema>;
export type SubscriptionErrors = z.inferFlattenedErrors<typeof subscriptionSchema>;

export type FieldBlurs = {
  [K in keyof SubscriptionErrors['fieldErrors']]: boolean;
};

export type FormEventTarget = {
  [K in keyof SubscriptionData]: {
    name: K;
    value: SubscriptionData[K];
  };
}[keyof SubscriptionData];

export type SubscriptionState = {
  status: 'initial' | 'field-error' | 'valid' | 'success' | 'error';
  message: string;
  form: {
    data: SubscriptionData;
    fieldErrors: SubscriptionErrors['fieldErrors'];
    fieldBlurs: FieldBlurs;
  };
};

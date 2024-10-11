import { z } from 'zod';

const subscriptionFormSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
});

export type SubscriptionForm = z.infer<typeof subscriptionFormSchema>;
export type FlattenedErrors = z.inferFlattenedErrors<typeof subscriptionFormSchema>;

export default subscriptionFormSchema;

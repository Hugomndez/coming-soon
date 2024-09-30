import { z } from 'zod';

export const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

import { z } from 'zod';

export const addSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export type AddSubscriptionSchema = z.infer<typeof addSubscriptionSchema>;

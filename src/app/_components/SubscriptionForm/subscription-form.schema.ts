import { z } from 'zod';

const subscriptionFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export type ISubscriptionForm = z.infer<typeof subscriptionFormSchema>;

export default subscriptionFormSchema;

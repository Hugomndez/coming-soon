import { ValidationError } from '@/entities/errors/common';
import { z } from 'zod';

type CreateSubscriptionController = Partial<z.infer<typeof createSubscriptionSchema>>;

const createSubscriptionSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
});

export async function createSubscriptionController(
  data: CreateSubscriptionController
): Promise<void> {
  const { error } = createSubscriptionSchema.safeParse(data);

  if (error) {
    const { fieldErrors } = error.flatten();
    throw new ValidationError('Invalid form data', fieldErrors);
  }
}

import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import * as z from 'zod/v4';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
  },
  extends: [vercel()],
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

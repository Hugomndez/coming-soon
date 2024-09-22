'use client';

import { useFormStatus } from 'react-dom';
import Spinner from './spinner';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}>
      {pending ? <Spinner /> : 'Notify Me'}
    </button>
  );
}

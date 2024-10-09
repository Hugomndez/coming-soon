import type { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import Spinner from './spinner';

type SubmitButtonProps = HTMLAttributes<HTMLButtonElement> & {
  defaultText: string;
};

export default function SubmitButton({ defaultText, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      {...props}>
      {pending ? <Spinner /> : defaultText}
    </button>
  );
}

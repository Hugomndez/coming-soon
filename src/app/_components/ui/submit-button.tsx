import type { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import Spinner from './spinner';

type SubmitButtonProps = HTMLAttributes<HTMLButtonElement> & {
  defaultText: string;
  disabled?: boolean;
};

export default function SubmitButton({ defaultText, disabled, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending || disabled}
      {...props}>
      {pending ? <Spinner /> : defaultText}
    </button>
  );
}

import { HTMLAttributes } from 'react';

export default function FieldErrorMessage({
  hasError,
  errorMessage,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { hasError: boolean; errorMessage: string }) {
  return <span {...props}>{hasError ? errorMessage : <>&nbsp;</>}</span>;
}

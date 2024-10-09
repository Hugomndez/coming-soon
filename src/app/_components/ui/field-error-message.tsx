import type { HTMLAttributes } from 'react';

type FieldErrorMessageProps = HTMLAttributes<HTMLSpanElement> & {
  showError: boolean;
  messages?: string[];
};

export default function FieldErrorMessage({
  showError,
  messages,
  ...props
}: FieldErrorMessageProps) {
  const message = messages?.[0] ?? ''; // Display only the first error message if multiple are present

  return <span {...props}>{showError ? message : <>&nbsp;</>}</span>;
}

'use client';
import { FieldErrorMessage, SubmitButton } from '@/app/_components/ui';
import styles from './subscription-form.module.css';
import useSubscriptionForm from './use-subscription-form';

export default function SubscriptionForm() {
  const { formState, formAction, handleBlur, handleChange } = useSubscriptionForm();

  return (
    <form
      className={styles.form}
      action={formAction}>
      <label htmlFor='email'>
        <input
          id='email'
          type='text'
          name='email'
          placeholder='Your email address...'
          autoComplete='on'
          onBlur={handleBlur}
          onChange={handleChange}
          value={formState.form.email}
          data-invalid={formState.blurs.email && !!formState.errors.email}
        />
      </label>

      <SubmitButton defaultText='Notify Me' />

      <FieldErrorMessage
        className={styles.errorMessage}
        hasError={formState.blurs.email && !!formState.errors.email}
        errorMessage={formState.errors.email}
      />
    </form>
  );
}

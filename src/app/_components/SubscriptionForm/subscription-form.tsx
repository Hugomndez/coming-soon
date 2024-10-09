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
          value={formState.form.data.email}
          data-invalid={formState.form.blurs.email && !!formState.form.fieldErrors.email}
        />
      </label>

      <SubmitButton defaultText='Notify Me' />

      <FieldErrorMessage
        className={styles.errorMessage}
        hasError={formState.form.blurs.email && !!formState.form.fieldErrors.email}
        errorMessage={formState.form.fieldErrors.email}
      />
    </form>
  );
}

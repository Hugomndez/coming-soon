'use client';
import { FieldErrorMessage, SubmitButton } from '@/app/_components/ui';
import styles from './subscription-form.module.css';
import useSubscriptionForm from './use-subscription-form.hook';

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
          data-invalid={!!formState.form.fieldBlurs.email && !!formState.form.fieldErrors.email}
        />
      </label>

      <SubmitButton defaultText='Notify Me' />

      <FieldErrorMessage
        className={styles.errorMessage}
        showError={!!formState.form.fieldBlurs.email && !!formState.form.fieldErrors.email}
        messages={formState.form.fieldErrors.email}
      />
    </form>
  );
}

'use client';
import { FieldErrorMessage, SubmitButton } from '../ui';
import styles from './subscription-form.module.css';
import useSubscriptionForm from './use-subscription-form.hook';

export default function SubscriptionForm() {
  const { formState, formAction, formHasErrors, handleBlur, handleChange, isFieldError } =
    useSubscriptionForm();

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
          autoComplete='email'
          onBlur={handleBlur}
          onChange={handleChange}
          value={formState.form.data.email}
          data-invalid={isFieldError('email')}
        />
      </label>
      <SubmitButton
        defaultText='Notify Me'
        disabled={formHasErrors}
      />
      <FieldErrorMessage
        className={styles.errorMessage}
        showError={isFieldError('email')}
        messages={formState.form.fieldErrors.email}
      />
    </form>
  );
}

'use client';
import { FieldErrorMessage, SubmitButton } from '@/app/_components/ui';
import styles from './subscription-form.module.css';
import useSubscriptionForm from './use-subscription-form';

export default function SubscriptionForm() {
  const { formState, formAction, handleOnBlur, handleInputChange } = useSubscriptionForm();

  const isEmailInvalid = !!formState.blurs?.email && !!formState.errors?.email;

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
          onBlur={handleOnBlur}
          onChange={handleInputChange}
          value={formState.form.email}
          data-invalid={isEmailInvalid}
        />
      </label>

      <SubmitButton defaultText='Notify Me' />

      <FieldErrorMessage
        className={styles.errorMessage}
        hasError={isEmailInvalid}
        errorMessage={formState.errors.email}
      />
    </form>
  );
}

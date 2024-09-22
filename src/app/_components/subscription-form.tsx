'use client';

import { useSubscriptionForm } from '../_hooks/useSubscriptionForm';
import SubmitButton from './submit-button';
import styles from './subscription-form.module.css';

export default function SubscriptionForm() {
  const { serverState, errors, blurs, subscription, handleOnBlur, handleInputChange, formAction } =
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
          onBlur={handleOnBlur}
          onChange={handleInputChange}
          value={subscription.email}
          data-invalid={!!blurs.email && !!errors.email}
        />
      </label>
      <SubmitButton />
      <span className={styles.message}>
        {serverState.successMessage ? serverState.successMessage : <>&nbsp;</>}
      </span>
      <span className={styles.error}>
        {blurs.email && errors?.email ? errors.email : <>&nbsp;</>}
      </span>
    </form>
  );
}

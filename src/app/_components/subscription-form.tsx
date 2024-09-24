'use client';

import { useSubscriptionForm } from '../_hooks/useSubscriptionForm';
import SubmitButton from './submit-button';
import styles from './subscription-form.module.css';

export default function SubscriptionForm() {
  const { formRef, formState, handleOnBlur, handleInputChange, formAction } = useSubscriptionForm();

  const isInvalid = !!formState.blurs?.email && !!formState.errors?.email;

  return (
    <form
      className={styles.form}
      ref={formRef}
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
          value={formState.data.email}
          data-invalid={isInvalid}
        />
      </label>

      <SubmitButton />

      <span className={styles.error}>{isInvalid ? formState.errors.email : <>&nbsp;</>}</span>
    </form>
  );
}

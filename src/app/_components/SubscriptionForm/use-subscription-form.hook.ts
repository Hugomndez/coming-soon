import type { FormEventTarget, SubscriptionState } from '@/entities/models/subscription';
import type { ChangeEvent, FocusEvent } from 'react';
import { useActionState, useEffect, useEffectEvent } from 'react';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import subscriptionAction from './subscription-form.action';
import { validateForm } from './utils';

const initialState: SubscriptionState = {
  status: 'initial',
  message: '',
  form: { data: { email: '' }, fieldErrors: {}, fieldBlurs: {} },
};

export default function useSubscriptionForm() {
  const [subscriptionState, formAction] = useActionState(subscriptionAction, initialState);
  const [formState, setFormState] = useImmer<SubscriptionState>(subscriptionState);

  const handleSubscriptionResponse = useEffectEvent((status: SubscriptionState['status']) => {
    if (status === 'field-error') {
      setFormState(subscriptionState);
      return;
    }

    if (status === 'error') {
      setFormState(subscriptionState);
      toast.error(subscriptionState.message);
      return;
    }

    if (status === 'success') {
      setFormState(initialState);
      toast.success(subscriptionState.message);
      return;
    }
  });

  useEffect(() => {
    handleSubscriptionResponse(subscriptionState.status);
  }, [subscriptionState]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target as FormEventTarget;

    setFormState((draft) => {
      draft.form.fieldBlurs[name] = true;
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as FormEventTarget;

    setFormState((draft) => {
      draft.form.data[name] = value;

      const { fieldErrors, status } = validateForm(draft.form.data);
      draft.form.fieldErrors = fieldErrors;
      draft.status = status;
    });
  };

  const formHasErrors = formState.status === 'field-error' || formState.status === 'error';

  const isFieldError = (name: keyof SubscriptionState['form']['fieldErrors']) => {
    return !!formState.form.fieldBlurs[name] && !!formState.form.fieldErrors[name];
  };

  return {
    formState,
    formAction,
    formHasErrors,
    handleBlur,
    handleChange,
    isFieldError,
  };
}

import type { FormEventTarget, SubscriptionState } from '@/entities/models/subscription';
import type { ChangeEvent, FocusEvent } from 'react';
import { useActionState, useEffect } from 'react';
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

  useEffect(() => {
    const handleStatus: { [key: string]: () => void } = {
      success: () => (setFormState(initialState), toast.success(subscriptionState.message)),
      error: () => (setFormState(initialState), toast.error(subscriptionState.message)),
      default: () => setFormState(subscriptionState),
    };
    (handleStatus[subscriptionState.status] || handleStatus.default)();
  }, [subscriptionState, setFormState]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target as FormEventTarget;
    setFormState((draft) => void (draft.form.fieldBlurs[name] = true));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as FormEventTarget;
    setFormState((draft) => {
      const { fieldErrors, status } = validateForm(draft.form.data);
      draft.form.data[name] = value;
      draft.form.fieldErrors = fieldErrors;
      draft.status = status;
    });
  };

  return {
    formState,
    formAction,
    handleBlur,
    handleChange,
  };
}

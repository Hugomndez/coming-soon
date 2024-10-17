import type { FormEventTarget, SubscriptionState } from '@/entities/models/subscription';
import type { ChangeEvent, FocusEvent } from 'react';
import { useCallback, useEffect } from 'react';
import { useFormState } from 'react-dom';
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
  const [subscriptionState, formAction] = useFormState(subscriptionAction, initialState);
  const [formState, setFormState] = useImmer<SubscriptionState>(subscriptionState);

  useEffect(() => {
    const handleStatus: { [key: string]: () => void } = {
      success: () => (setFormState(initialState), toast.success(subscriptionState.message)),
      default: () => setFormState(subscriptionState),
    };
    (handleStatus[subscriptionState.status] || handleStatus.default)();
  }, [subscriptionState, setFormState]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { name } = event.target as FormEventTarget;
      setFormState((draft) => void (draft.form.fieldBlurs[name] = true));
    },
    [setFormState]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target as FormEventTarget;
      setFormState((draft) => {
        draft.form.data[name] = value;
        const { fieldErrors, status } = validateForm(draft.form.data);
        draft.form.fieldErrors = fieldErrors;
        draft.status = status;
      });
    },
    [setFormState]
  );

  return {
    formState,
    formAction,
    handleBlur,
    handleChange,
  };
}

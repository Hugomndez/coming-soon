import { useCallback, useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import subscriptionAction from './subscription-form.action';
import { type SubscriptionForm } from './subscription-form.schema';
import { type SubscriptionState, SubscriptionStatus } from './subscription-form.types';
import { validateForm } from './subscription-form.utils';

const initialState: SubscriptionState = {
  status: SubscriptionStatus.Initial,
  message: '',
  form: { data: { email: '' }, errors: {}, blurs: {} },
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
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target;
      setFormState((draft) => void (draft.form.blurs[name] = true));
    },
    [setFormState]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target as { name: keyof SubscriptionForm; value: string };
      setFormState((draft) => {
        draft.form.data[name] = value;
        const { errors, status } = validateForm(draft.form.data);
        draft.form.errors = errors;
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

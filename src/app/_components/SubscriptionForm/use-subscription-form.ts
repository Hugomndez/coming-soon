import { useCallback, useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import subscriptionAction from './subscription-form.action';
import subscriptionFormSchema, { type SubscriptionForm } from './subscription-form.schema';
import type { SubscriptionState } from './subscription-form.types';
import { convertZodErrors } from './subscription-form.utils';

const initialState: SubscriptionState = {
  status: 'default',
  message: '',
  errors: {},
  blurs: {},
  form: { email: '' },
};

export default function useSubscriptionForm() {
  const [subscriptionState, formAction] = useFormState(subscriptionAction, initialState);
  const [formState, setFormState] = useImmer<SubscriptionState>(subscriptionState);

  useEffect(() => {
    if (subscriptionState.status === 'success') {
      toast.success(subscriptionState.message);
      setFormState(initialState);
    } else {
      setFormState(subscriptionState);
    }
  }, [subscriptionState, setFormState]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target;
      setFormState((draft) => (draft.blurs[name] = true));
    },
    [setFormState]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target as { name: keyof SubscriptionForm; value: string };

      setFormState((draft) => {
        draft.form[name] = value;
        const parsedResult = subscriptionFormSchema.safeParse(draft.form);

        if (!parsedResult.success) {
          draft.errors = convertZodErrors(parsedResult.error);
          draft.status = 'error';
        } else {
          draft.errors = {};
          draft.status = 'isValid';
        }
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

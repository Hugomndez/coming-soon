import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import subscriptionAction from './subscription-form.action';
import subscriptionFormSchema from './subscription-form.schema';
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
  const [formState, setFormState] = useState<SubscriptionState>(subscriptionState);

  useEffect(() => {
    if (subscriptionState.status === 'success') {
      toast.success(subscriptionState.message);
      setFormState(initialState);
      return;
    }

    setFormState(subscriptionState);
  }, [subscriptionState]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;
    setFormState((prevState) => ({ ...prevState, blurs: { ...prevState.blurs, [name]: true } }));
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState((prevState) => {
      const newState = { ...prevState, form: { ...prevState.form, [name]: value } };
      const parsedResult = subscriptionFormSchema.safeParse(newState.form);

      if (!parsedResult.success) {
        const errors = convertZodErrors(parsedResult.error);
        return { ...newState, errors, status: 'error' };
      }

      return { ...newState, errors: {}, status: 'isValid' };
    });
  }, []);

  return {
    formState,
    formAction,
    handleBlur,
    handleChange,
  };
}

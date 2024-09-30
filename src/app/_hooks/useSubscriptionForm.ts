import subscriptionAction from '@/app/_actions/subscriptionAction';
import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { subscriptionSchema } from '../_schemas/subscriptionSchema';
import type { SubscriptionState } from '../_types';
import { blurAllFormFields, convertZodErrors } from '../_utils';

const initialState: SubscriptionState = {
  message: '',
  errors: {},
  blurs: {},
  data: { email: '' },
};

export function useSubscriptionForm() {
  const [subscriptionState, formAction] = useFormState(subscriptionAction, initialState);
  const [formState, setFormState] = useState<SubscriptionState>(subscriptionState);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      data: subscriptionState.data,
      blurs: subscriptionState.blurs,
      errors: subscriptionState.errors,
      message: subscriptionState.message,
    }));

    if (subscriptionState.errors) {
      const blurs = blurAllFormFields(subscriptionSchema.shape);

      setFormState((prevState) => ({ ...prevState, blurs }));
    }

    if (subscriptionState.message) {
      toast.success(subscriptionState.message);
    }
  }, [subscriptionState]);

  const handleOnBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFormState((prevState) => ({ ...prevState, blurs: { ...prevState.blurs, [name]: true } }));
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prevState) => {
      const newState = { ...prevState, data: { ...prevState.data, [name]: value } };
      const parsedResult = subscriptionSchema.safeParse(newState.data);

      if (!parsedResult.success) {
        const errors = convertZodErrors(parsedResult.error);

        return { ...newState, errors };
      }

      return { ...newState, errors: {} };
    });
  }, []);

  return {
    formState,
    formAction,
    handleOnBlur,
    handleInputChange,
  };
}

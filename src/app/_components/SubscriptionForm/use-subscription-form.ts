import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import subscriptionAction from './subscription-form.action';
import subscriptionSchema from './subscription-form.schema';
import type { SubscriptionState } from './subscription-form.types';
import { blurAllFormFields, convertZodErrors } from './subscription-form.utils';

const initialState: SubscriptionState = {
  message: '',
  errors: {},
  blurs: {},
  form: { email: '' },
};

export default function useSubscriptionForm() {
  const [subscriptionState, formAction] = useFormState(subscriptionAction, initialState);
  const [formState, setFormState] = useState<SubscriptionState>(subscriptionState);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      form: subscriptionState.form,
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
      const newState = { ...prevState, form: { ...prevState.form, [name]: value } };
      const parsedResult = subscriptionSchema.safeParse(newState.form);

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

import addSubscriptionAction from '@/app/_actions/addSubscriptionAction';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import type { AddSubscriptionSchema } from '../_schemas/addSubscriptionSchema';
import { addSubscriptionSchema } from '../_schemas/addSubscriptionSchema';
import type { AddSubscriptionState, StringMap, StringToBooleanMap } from '../_types';
import { convertZodErrors } from '../_utils';

const inputNames = ['email'];
const initialState: AddSubscriptionState = {};
const initialData: AddSubscriptionSchema = { email: '' };

export function useSubscriptionForm() {
  const [serverState, formAction] = useFormState(addSubscriptionAction, initialState);
  const [errors, setErrors] = useState<StringMap>(serverState.errors || {});
  const [blurs, setBlurs] = useState<StringToBooleanMap>(serverState.blurs || {});
  const [subscription, setSubscription] = useState<AddSubscriptionSchema>(
    serverState.data || initialData
  );

  useEffect(() => {
    if (serverState.successMessage) {
      setBlurs({});
    } else if (serverState.errors) {
      setAllBlurred();
    }
    if (serverState.data) {
      setSubscription(serverState.data);
    }
    setErrors(serverState.errors || {});
  }, [serverState]);

  const setAllBlurred = () => {
    const blurred: StringToBooleanMap = {};
    inputNames.forEach((name) => {
      blurred[name] = true;
    });
    setBlurs(blurred);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setBlurs((prev) => ({ ...prev, [name]: true }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSubscription((prevSubscription) => {
      const updatedSubscription = { ...prevSubscription, [name]: value };
      const validatedResult = addSubscriptionSchema.safeParse(updatedSubscription);

      if (!validatedResult.success) {
        const validationErrors = convertZodErrors(validatedResult.error);
        setErrors(validationErrors);
      } else {
        setErrors({});
      }

      return updatedSubscription;
    });
  };

  return {
    serverState,
    errors,
    blurs,
    subscription,
    handleOnBlur,
    handleInputChange,
    formAction,
  };
}

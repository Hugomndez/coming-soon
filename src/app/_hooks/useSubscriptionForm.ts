import addSubscriptionAction from '@/app/_actions/addSubscriptionAction';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { addSubscriptionSchema } from '../_schemas/addSubscriptionSchema';
import type { AddSubscriptionState, StringToBooleanMap } from '../_types';
import { convertZodErrors } from '../_utils';

const inputNames = ['email'];
const initialState: AddSubscriptionState = {
  message: '',
  errors: {},
  blurs: {},
  data: { email: '' },
};

export function useSubscriptionForm() {
  const [serverState, formAction] = useFormState(addSubscriptionAction, initialState);
  const [formState, setFormState] = useState<AddSubscriptionState>(serverState);

  useEffect(() => {
    if (serverState.errors) {
      setAllBlurred();
    }

    if (serverState.data) {
      setFormState((prevState) => ({ ...prevState, data: serverState.data }));
    }

    if (serverState.message) {
      toast.success(serverState.message);
      setFormState((prevState) => ({ ...prevState, blurs: {} }));
    }

    setFormState((prevState) => ({ ...prevState, errors: serverState.errors || {} }));
  }, [serverState]);

  const setAllBlurred = () => {
    const blurred: StringToBooleanMap = {};
    inputNames.forEach((name) => {
      blurred[name] = true;
    });
    setFormState((prevState) => ({ ...prevState, blurs: blurred }));
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFormState((prevState) => ({ ...prevState, blurs: { ...prevState.blurs, [name]: true } }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prevState) => {
      const updatedFormState = { ...prevState, data: { ...prevState.data, [name]: value } };
      const validatedResult = addSubscriptionSchema.safeParse(updatedFormState.data);

      if (!validatedResult.success) {
        const validationErrors = convertZodErrors(validatedResult.error);
        return { ...updatedFormState, errors: validationErrors };
      }

      return { ...updatedFormState, errors: {} };
    });
  };

  return {
    formState,
    handleOnBlur,
    handleInputChange,
    formAction,
  };
}

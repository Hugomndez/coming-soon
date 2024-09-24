import addSubscriptionAction from '@/app/_actions/addSubscriptionAction';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { addSubscriptionSchema } from '../_schemas/addSubscriptionSchema';
import type { AddSubscriptionState, StringToBooleanMap } from '../_types';
import { convertZodErrors } from '../_utils';

const initialState: AddSubscriptionState = {
  message: '',
  errors: {},
  blurs: {},
  data: { email: '' },
};

export function useSubscriptionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [serverState, formAction] = useFormState(addSubscriptionAction, initialState);
  const [formState, setFormState] = useState<AddSubscriptionState>(serverState);

  const setAllBlurred = useCallback(() => {
    if (formRef.current) {
      const inputNames = Array.from(formRef.current.elements)
        .filter((element): element is HTMLInputElement => element.tagName === 'INPUT')
        .map((input) => input.name);

      const blurred: StringToBooleanMap = inputNames.reduce((acc, name) => {
        acc[name] = true;
        return acc;
      }, {} as StringToBooleanMap);

      setFormState((prevState) => ({ ...prevState, blurs: blurred }));
    }
  }, []);

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
  }, [serverState, setAllBlurred]);

  const handleOnBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFormState((prevState) => ({ ...prevState, blurs: { ...prevState.blurs, [name]: true } }));
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  return {
    formRef,
    formState,
    handleOnBlur,
    handleInputChange,
    formAction,
  };
}

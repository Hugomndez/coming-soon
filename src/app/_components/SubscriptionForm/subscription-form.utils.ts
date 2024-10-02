import { ZodError, ZodRawShape } from 'zod';
import { StringMap, StringToBooleanMap } from './subscription-form.types';

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};

export const blurAllFormFields = (schema: ZodRawShape): StringToBooleanMap => {
  const inputNames = Object.keys(schema);

  return Object.fromEntries(inputNames.map((name) => [name, true]));
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

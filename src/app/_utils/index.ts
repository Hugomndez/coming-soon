import { StringMap } from '@/app/_types';
import { ZodError } from 'zod';

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class ValidationError extends Error {
  fieldErrors: Record<string, string[]>;
  constructor(message: string, fieldErrors: Record<string, string[]>, options?: ErrorOptions) {
    super(message, options);
    this.fieldErrors = fieldErrors;
    this.name = 'ValidationError';
  }
}

export class ValidationError extends Error {
  fieldErrors: Record<string, string[]>;
  constructor(message: string, fieldErrors: Record<string, string[]>, options?: ErrorOptions) {
    super(message, options);
    this.fieldErrors = fieldErrors;
    this.name = 'ValidationError';
  }
}

export class EmailAlreadySubscribedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'EmailAlreadySubscribedError';
  }
}

export class DataBaseOperationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'DataBaseOperationError';
  }
}

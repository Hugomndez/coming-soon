export class ValidationError extends Error {
  fieldErrors: Record<string, string[]>;
  fieldBlurs: Record<string, boolean>;
  constructor(
    message: string,
    fieldErrors: Record<string, string[]>,
    fieldBlurs: Record<string, boolean>,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.fieldErrors = fieldErrors;
    this.fieldBlurs = fieldBlurs;
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

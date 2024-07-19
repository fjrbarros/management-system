interface ICustomError {
  message: string;
  code?: string;
}

export class CustomError {
  message: string;
  code: string;

  constructor({ message, code = 'custom_error' }: ICustomError) {
    this.message = message;
    this.code = code;
  }
}

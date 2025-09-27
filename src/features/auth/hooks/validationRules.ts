export const validationRules = (pass: string) => {
  return {
    name: {
      required: 'This field is required.',
      pattern: {
        value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/,
        message: 'Symbols and spaces are not allowed',
      },
    },
    username: {
      required: 'This field is required.',
      minLength: {
        value: 3,
        message: 'Username is too short',
      },
      maxLength: {
        value: 17,
        message: 'Username is too long',
      },
      pattern: {
        value: /^[a-zA-Z0-9_-]+$/,
        message: 'Username must be consistent.',
      },
    },
    email: {
      required: 'This field is required.',
      pattern: {
        value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        message: 'Invalid Email Address',
      },
    },
    password: {
      required: 'This field is required.',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
      validate: (value: string) => {
        return (
          [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) ||
          'Must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        );
      },
    },
    repeatPassword: {
      validate: (value: string) => value === pass || 'Passwords do not match',
    },
  };
};

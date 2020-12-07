import { EmailRegex } from "./regex";

export const required = (value: string) => {
  if (typeof value === "string" && value) {
    return null;
  } else {
    return "This field is required";
  }
};

export const email = (value: string) => {
  if (EmailRegex.test(value)) {
    return null;
  } else {
    return "Invalid email format";
  }
};

export const length = (length: number) => (value: string) => {
  if (value.length >= length) {
    return null;
  }
  return `This field must be at least ${length} characters long`;
};

export const composeValidators = (
  validators: Array<(value: string) => string | null>,
) => (value: string) => {
  return validators.reduce(
    (prev: string | null, curr) => (prev ? prev : curr(value)),
    null,
  );
};

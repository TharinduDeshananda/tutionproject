import { ValidationError } from "class-validator";

export default function getFIrstErrorMessageFromValidationError(
  errors: ValidationError[]
) {
  if (errors.length > 0) {
    const firstErrorKey = Object.keys(errors[0]?.constraints)?.[0];
    const errorMessage = errors[0]?.constraints?.[firstErrorKey];
    return errorMessage;
  }

  return null;
}

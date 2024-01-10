import { validate } from "class-validator";
import getFIrstErrorMessageFromValidationError from "./Errormessages";

export async function ValidateAndThrow(requestDto: any) {
  try {
    const errors = await validate(requestDto);
    const firstErrorMessage = getFIrstErrorMessageFromValidationError(errors);
    if (firstErrorMessage) throw new Error(firstErrorMessage);
  } catch (error) {
    throw error;
  }
}

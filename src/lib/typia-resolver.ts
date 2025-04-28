import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import type {
  FieldError,
  FieldValues,
  Resolver,
  ResolverError,
  ResolverOptions,
  ResolverSuccess,
} from "react-hook-form";
import type { IValidation } from "typia";

const $inputRegExp = /^\$input\.?/g;

/**
 * Converts a string path (e.g. users[0].name) into a nested error object from @hookform/resolvers.
 * Helps react-hook-form display errors correctly in nested field structures.
 * @param errors - The overall nested errors object for react-hook-form { [fieldName] : <FieldError> }
 * @param path - The fieldName we need to append the FieldError object to
 * @param error The FieldErrorObject we need to append to the [fieldName]
 */
function mapError<_TFieldValues extends FieldValues = FieldValues>(
  errors: Record<string, FieldError>,
  path: string,
  error: { type: string; message: string },
) {
  if (!errors[path]) {
    errors[path] = {
      type: error.type,
      message: error.message,
    };
  }

  return errors;
}

/**
 * Extract the last error path from typia
 * @param expected string - the path error from typia (eg. string & Format<"email">)
 * @returns string - the last path of the error (eg. Format("email"))
 */
const extractConstraint = (expected: string): string => {
  return expected.split("&")?.at(-1)?.trim() || "_";
};

/**
 *
 * @param validate - The validation function from Typia (Only Validation Function)
 * @param messages - The custom messages mapped to the field name
 * @returns Resolver<TFieldValues> - The resolver function for react-hook-form
 */
export function typiaResolver<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends TFieldValues = TFieldValues,
>(
  validate: (input: Partial<TFieldValues>) => IValidation<TTransformedValues>,
  messages?:
    | Partial<Record<keyof TFieldValues, Record<string, string>>>
    | undefined,
): Resolver<TFieldValues> {
  return (
    values: TFieldValues,
    _context: TContext | undefined,
    options: ResolverOptions<TFieldValues>,
  ) => {
    // validate the input
    const result = validate(values);

    options.shouldUseNativeValidation && validateFieldsNatively({}, options);

    // if success return the values
    if (!result.success) {
      const errors: Record<string, FieldError> = {};

      // else structure the error messages to { [fieldName] : FieldError }
      for (const error of result.errors) {
        const path = error.path.replaceAll($inputRegExp, "") || "_"; // Extract 'email' from '$input.email'

        if (!path) {
          continue;
        }

        // get the last constrain from "expected" error message
        const constraint = extractConstraint(error.expected);

        mapError(errors, path, {
          type: error.path,
          message: messages?.[path]?.[constraint] ?? error.expected,
        });
      }

      return {
        values: {} as TFieldValues,
        errors: toNestErrors(errors, options),
      } satisfies ResolverError<TFieldValues>;
    }

    return {
      values: result.data,
      errors: {},
    } satisfies ResolverSuccess<TTransformedValues>;
  };
}

import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/AppError";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validate__RESOURCE__Create(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { /* required fields */ } = req.body as Record<string, unknown>;

  // Example required string field:
  // if (!isNonEmptyString(name)) {
  //   return next(new ValidationError("'name' is required and must be a non-empty string"));
  // }

  // Example required email field:
  // if (!isNonEmptyString(email)) {
  //   return next(new ValidationError("'email' is required and must be a non-empty string"));
  // }
  // if (!EMAIL_REGEX.test(email)) {
  //   return next(new ValidationError("'email' must be a valid email address"));
  // }

  // Example optional string field:
  // if (optionalField !== undefined && !isNonEmptyString(optionalField)) {
  //   return next(new ValidationError("'optionalField' must be a non-empty string when provided"));
  // }

  next();
}

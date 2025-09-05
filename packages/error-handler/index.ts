export class appError extends Error {
  public readonly statuscode: number;
  public readonly isOperational: boolean;
  public readonly details: any;

  constructor(
    message: string,
    statuscode: number,
    details?: any,
    isOperational = true
  ) {
    super(message);
    this.statuscode = statuscode;
    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

// not found error
export class NotFoundError extends appError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}


// validation error
export class ValidationError extends appError {
  constructor(message = "Validation Error", details?: any) {
    super(message, 400, true, details, );
  }
}


// authentication error
export class AuthError extends appError {
  constructor(message = "Authentication Error", details?: any) {
    super(message, 401, true, details);
  }
}


// forbidden error
export class ForbiddenError extends appError {
  constructor(message = "Forbidden Error", details?: any) {
    super(message, 403, true, details);
  }
}


// database error (permission related error)
export class DatabaseError extends appError {
  constructor(message = "Database Error", details?: any) {
    super(message, 500, false, details);
  }
}


// rate limit error
export class RateLimitError extends appError {
  constructor(message = "Too Many Requests", details?: any) {
    super(message, 429, true, details);
  }}
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';

//! global error handler has 4 parameter
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statuscode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSource: TErrorSource;
  };

  const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: 'Validation Error',
      errorSource,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: err.stack,

    //error: err,
  });
};

export default globalErrorHandler;

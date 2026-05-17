import { z } from 'zod';

/**
 * Industry-standard validation middleware using Zod.
 * Validates request body, query params, and/or params against a provided schema.
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    // Parse the request using the provided Zod schema
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Replace request data with validated (and optionally transformed) data
    if (validatedData.body !== undefined) {
      req.body = validatedData.body;
    }

    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format the Zod errors into a clean array of error objects
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'), // e.g., 'body.email'
        message: err.message,
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return next(error);
  }
};

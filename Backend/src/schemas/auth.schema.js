import { z } from 'zod';

// Define complex password rules to match the frontend ValidationCard
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const signupSchema = z.object({
  body: z.object({
    first_name: z.string().min(1, 'First name is required').trim(),
    last_name: z.string().min(1, 'Surname is required').trim(),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: passwordSchema,
    date_of_birth: z.string().optional(),
    gender: z.enum(['male', 'female', 'custom']).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(1, 'Password is required'),
  }),
});

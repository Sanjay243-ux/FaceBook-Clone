import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

// ─── Helper: sign JWT ────────────────────────────
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: `${user.first_name} ${user.last_name}` },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  );
}

// ─── POST /api/auth/signup ───────────────────────
router.post(
  '/signup',
  validate(signupSchema),
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, date_of_birth, gender } = req.body;

    // Check if email is already taken
    const { data: existing } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Insert user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.toLowerCase().trim(),
        password_hash,
        date_of_birth: date_of_birth || null,
        gender: gender || null,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${first_name}`,
      })
      .select('id, first_name, last_name, email, avatar_url, created_at')
      .single();

    if (error) throw error;

    // Create default profile
    await supabaseAdmin.from('profiles').insert({
      user_id: user.id,
      bio: '',
      cover_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    });

    const token = signToken(user);
    res.status(201).json({ token, user });
  }),
);

// ─── POST /api/auth/login ────────────────────────
router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Strip password_hash from response
    const { password_hash, ...safeUser } = user;
    const token = signToken(user);

    res.json({ token, user: safeUser });
  }),
);

// ─── GET /api/auth/me ────────────────────────────
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, first_name, last_name, email, avatar_url, created_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  }),
);

export default router;

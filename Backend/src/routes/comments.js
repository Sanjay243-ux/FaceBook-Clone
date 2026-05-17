import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { post_id, page = 1, limit = 20 } = req.query;
  if (!post_id) return res.status(400).json({ error: 'post_id required' });
  const offset = (page - 1) * limit;
  const { data, error, count } = await supabaseAdmin
    .from('comments')
    .select('*, author:users!comments_user_id_fkey (id, first_name, last_name, avatar_url)', { count: 'exact' })
    .eq('post_id', post_id).order('created_at', { ascending: true }).range(offset, offset + limit - 1);
  if (error) throw error;
  res.json({ comments: data, pagination: { page: +page, limit: +limit, total: count } });
}));

router.post('/', authenticate, asyncHandler(async (req, res) => {
  const { post_id, body } = req.body;
  if (!post_id || !body?.trim()) return res.status(400).json({ error: 'post_id and body required' });
  const { data, error } = await supabaseAdmin.from('comments')
    .insert({ post_id, user_id: req.user.id, body: body.trim() })
    .select('*, author:users!comments_user_id_fkey (id, first_name, last_name, avatar_url)').single();
  if (error) throw error;
  const { data: post } = await supabaseAdmin.from('posts').select('user_id').eq('id', post_id).single();
  if (post && post.user_id !== req.user.id) {
    await supabaseAdmin.from('notifications').insert({ user_id: post.user_id, from_user_id: req.user.id, type: 'comment', reference_id: post_id, message: `${req.user.name} commented on your post` });
  }
  res.status(201).json({ comment: data });
}));

router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { data: existing } = await supabaseAdmin.from('comments').select('user_id').eq('id', req.params.id).single();
  if (!existing) return res.status(404).json({ error: 'Comment not found' });
  if (existing.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await supabaseAdmin.from('comments').delete().eq('id', req.params.id);
  res.json({ message: 'Comment deleted' });
}));

export default router;

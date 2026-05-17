import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Send friend request
router.post('/request', authenticate, asyncHandler(async (req, res) => {
  const { friend_id } = req.body;
  if (!friend_id) return res.status(400).json({ error: 'friend_id required' });
  if (friend_id === req.user.id) return res.status(400).json({ error: 'Cannot friend yourself' });

  // Check existing
  const { data: existing } = await supabaseAdmin.from('friendships')
    .select('*').or(`and(user_id.eq.${req.user.id},friend_id.eq.${friend_id}),and(user_id.eq.${friend_id},friend_id.eq.${req.user.id})`).maybeSingle();
  if (existing) return res.status(409).json({ error: 'Friendship already exists', status: existing.status });

  const { data, error } = await supabaseAdmin.from('friendships')
    .insert({ user_id: req.user.id, friend_id, status: 'pending' }).select().single();
  if (error) throw error;

  await supabaseAdmin.from('notifications').insert({ user_id: friend_id, from_user_id: req.user.id, type: 'friend_request', reference_id: data.id, message: `${req.user.name} sent you a friend request` });
  res.status(201).json({ friendship: data });
}));

// Accept friend request
router.put('/accept/:id', authenticate, asyncHandler(async (req, res) => {
  const { data: friendship } = await supabaseAdmin.from('friendships').select('*').eq('id', req.params.id).single();
  if (!friendship) return res.status(404).json({ error: 'Request not found' });
  if (friendship.friend_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  const { data, error } = await supabaseAdmin.from('friendships').update({ status: 'accepted' }).eq('id', req.params.id).select().single();
  if (error) throw error;

  await supabaseAdmin.from('notifications').insert({ user_id: friendship.user_id, from_user_id: req.user.id, type: 'friend_accepted', reference_id: data.id, message: `${req.user.name} accepted your friend request` });
  res.json({ friendship: data });
}));

// Remove / Decline friendship
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const { data: friendship } = await supabaseAdmin.from('friendships').select('*').eq('id', req.params.id).single();
  if (!friendship) return res.status(404).json({ error: 'Not found' });
  if (friendship.user_id !== req.user.id && friendship.friend_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  await supabaseAdmin.from('friendships').delete().eq('id', req.params.id);
  res.json({ message: 'Friendship removed' });
}));

// List friends of a user
router.get('/:userId', asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { data, error } = await supabaseAdmin.from('friendships')
    .select('*, user:users!friendships_user_id_fkey(id,first_name,last_name,avatar_url), friend:users!friendships_friend_id_fkey(id,first_name,last_name,avatar_url)')
    .eq('status', 'accepted').or(`user_id.eq.${userId},friend_id.eq.${userId}`);
  if (error) throw error;

  const friends = data.map(f => f.user_id === userId ? f.friend : f.user);
  res.json({ friends });
}));

export default router;

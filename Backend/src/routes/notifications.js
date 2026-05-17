import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Get notifications
router.get('/', authenticate, asyncHandler(async (req, res) => {
  const { page = 1, limit = 30 } = req.query;
  const offset = (page - 1) * limit;
  const { data, error, count } = await supabaseAdmin.from('notifications')
    .select('*, from_user:users!notifications_from_user_id_fkey(id,first_name,last_name,avatar_url)', { count: 'exact' })
    .eq('user_id', req.user.id).order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  if (error) throw error;
  res.json({ notifications: data, pagination: { page: +page, limit: +limit, total: count } });
}));

// Mark as read
router.put('/:id/read', authenticate, asyncHandler(async (req, res) => {
  const { error } = await supabaseAdmin.from('notifications').update({ read: true }).eq('id', req.params.id).eq('user_id', req.user.id);
  if (error) throw error;
  res.json({ message: 'Marked as read' });
}));

// Mark all read
router.put('/read-all', authenticate, asyncHandler(async (req, res) => {
  const { error } = await supabaseAdmin.from('notifications').update({ read: true }).eq('user_id', req.user.id).eq('read', false);
  if (error) throw error;
  res.json({ message: 'All notifications marked as read' });
}));

// Unread count
router.get('/unread-count', authenticate, asyncHandler(async (req, res) => {
  const { count, error } = await supabaseAdmin.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', req.user.id).eq('read', false);
  if (error) throw error;
  res.json({ count });
}));

export default router;

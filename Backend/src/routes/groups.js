import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// List groups
router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await supabaseAdmin.from('groups')
    .select('*, members:group_members(count)').order('created_at', { ascending: false });
  if (error) throw error;
  const shaped = data.map(g => ({ ...g, member_count: g.members?.[0]?.count || 0, members: undefined }));
  res.json({ groups: shaped });
}));

// Create group
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const { name, description, privacy, image_url } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: 'Group name required' });

  const { data: group, error } = await supabaseAdmin.from('groups')
    .insert({ name: name.trim(), description: description || '', privacy: privacy || 'public', image_url: image_url || null, created_by: req.user.id })
    .select().single();
  if (error) throw error;

  // Creator auto-joins as admin
  await supabaseAdmin.from('group_members').insert({ group_id: group.id, user_id: req.user.id, role: 'admin' });
  res.status(201).json({ group });
}));

// Join group
router.post('/:id/join', authenticate, asyncHandler(async (req, res) => {
  const { data: existing } = await supabaseAdmin.from('group_members').select('id')
    .eq('group_id', req.params.id).eq('user_id', req.user.id).maybeSingle();
  if (existing) return res.status(409).json({ error: 'Already a member' });

  const { data, error } = await supabaseAdmin.from('group_members')
    .insert({ group_id: req.params.id, user_id: req.user.id, role: 'member' }).select().single();
  if (error) throw error;
  res.status(201).json({ membership: data });
}));

// Leave group
router.delete('/:id/leave', authenticate, asyncHandler(async (req, res) => {
  await supabaseAdmin.from('group_members').delete().eq('group_id', req.params.id).eq('user_id', req.user.id);
  res.json({ message: 'Left group' });
}));

export default router;

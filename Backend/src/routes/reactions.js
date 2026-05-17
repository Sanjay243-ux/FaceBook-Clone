import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// ─── POST /api/reactions — toggle reaction ───────
router.post(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { post_id, type = 'like' } = req.body;

    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }

    // Check if already reacted
    const { data: existing } = await supabaseAdmin
      .from('reactions')
      .select('id, type')
      .eq('post_id', post_id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (existing) {
      if (existing.type === type) {
        // Same reaction → remove it (toggle off)
        await supabaseAdmin.from('reactions').delete().eq('id', existing.id);
        return res.json({ action: 'removed', type });
      }
      // Different reaction → update it
      const { data } = await supabaseAdmin
        .from('reactions')
        .update({ type })
        .eq('id', existing.id)
        .select()
        .single();
      return res.json({ action: 'updated', reaction: data });
    }

    // New reaction
    const { data: reaction, error } = await supabaseAdmin
      .from('reactions')
      .insert({ post_id, user_id: req.user.id, type })
      .select()
      .single();

    if (error) throw error;

    // Create notification for post author
    const { data: post } = await supabaseAdmin
      .from('posts')
      .select('user_id')
      .eq('id', post_id)
      .single();

    if (post && post.user_id !== req.user.id) {
      await supabaseAdmin.from('notifications').insert({
        user_id: post.user_id,
        from_user_id: req.user.id,
        type: 'reaction',
        reference_id: post_id,
        message: `${req.user.name} reacted to your post`,
      });
    }

    res.status(201).json({ action: 'added', reaction });
  }),
);

export default router;

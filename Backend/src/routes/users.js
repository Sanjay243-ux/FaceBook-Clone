import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// ─── GET /api/users/:id — public profile ─────────
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select(`
        id, first_name, last_name, avatar_url, created_at,
        profile:profiles (bio, workplace, education, location, hometown, relationship_status, cover_url)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get friend count
    const { count: friendCount } = await supabaseAdmin
      .from('friendships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'accepted')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

    // Get post count
    const { count: postCount } = await supabaseAdmin
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    res.json({
      user: {
        ...user,
        profile: user.profile?.[0] || null,
        friend_count: friendCount || 0,
        post_count: postCount || 0,
      },
    });
  }),
);

// ─── PUT /api/users/profile — update own profile ─
router.put(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const { bio, workplace, education, location, hometown, relationship_status, cover_url } = req.body;

    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (workplace !== undefined) updates.workplace = workplace;
    if (education !== undefined) updates.education = education;
    if (location !== undefined) updates.location = location;
    if (hometown !== undefined) updates.hometown = hometown;
    if (relationship_status !== undefined) updates.relationship_status = relationship_status;
    if (cover_url !== undefined) updates.cover_url = cover_url;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert({ user_id: req.user.id, ...updates }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    res.json({ profile: data });
  }),
);

// ─── PUT /api/users/avatar — update avatar ───────
router.put(
  '/avatar',
  authenticate,
  asyncHandler(async (req, res) => {
    const { avatar_url } = req.body;

    if (!avatar_url) {
      return res.status(400).json({ error: 'avatar_url is required' });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ avatar_url })
      .eq('id', req.user.id)
      .select('id, first_name, last_name, avatar_url')
      .single();

    if (error) throw error;

    res.json({ user: data });
  }),
);

// ─── GET /api/users/:id/posts — user's posts ─────
router.get(
  '/:id/posts',
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: posts, error, count } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        author:users!posts_user_id_fkey (id, first_name, last_name, avatar_url),
        reactions:reactions(count),
        comments:comments(count)
      `, { count: 'exact' })
      .eq('user_id', req.params.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const shaped = posts.map((p) => ({
      ...p,
      reactions_count: p.reactions?.[0]?.count || 0,
      comments_count: p.comments?.[0]?.count || 0,
    }));

    res.json({ posts: shaped, pagination: { page: +page, limit: +limit, total: count } });
  }),
);

export default router;

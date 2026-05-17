import { Router } from 'express';
import supabaseAdmin from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

// ─── GET /api/posts — list posts (public, paginated) ──
router.get(
  '/',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const { category, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('posts')
      .select(`
        *,
        author:users!posts_user_id_fkey (id, first_name, last_name, avatar_url),
        reactions:reactions(count),
        comments:comments(count)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,body.ilike.%${search}%`);
    }

    const { data: posts, error, count } = await query;
    if (error) throw error;

    // Reshape the count aggregates
    const shaped = posts.map((p) => ({
      ...p,
      reactions_count: p.reactions?.[0]?.count || 0,
      comments_count: p.comments?.[0]?.count || 0,
      reactions: undefined,
      comments: undefined,
    }));

    res.json({
      posts: shaped,
      pagination: { page: +page, limit: +limit, total: count },
    });
  }),
);

// ─── GET /api/posts/:id — single post ────────────
router.get(
  '/:id',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        author:users!posts_user_id_fkey (id, first_name, last_name, avatar_url),
        reactions:reactions(count),
        comments:comments(count)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.reactions_count = post.reactions?.[0]?.count || 0;
    post.comments_count = post.comments?.[0]?.count || 0;

    res.json({ post });
  }),
);

// ─── POST /api/posts — create post ──────────────
router.post(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { title, body, category, image_url } = req.body;

    if (!body?.trim()) {
      return res.status(400).json({ error: 'Post body is required' });
    }

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .insert({
        user_id: req.user.id,
        title: title?.trim() || body.trim().slice(0, 120),
        body: body.trim(),
        category: category || 'News',
        image_url: image_url || null,
      })
      .select(`
        *,
        author:users!posts_user_id_fkey (id, first_name, last_name, avatar_url)
      `)
      .single();

    if (error) throw error;

    res.status(201).json({ post });
  }),
);

// ─── PUT /api/posts/:id — update post ───────────
router.put(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { title, body, category, image_url } = req.body;

    // Verify ownership
    const { data: existing } = await supabaseAdmin
      .from('posts')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.user_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own posts' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (body !== undefined) updates.body = body.trim();
    if (category !== undefined) updates.category = category;
    if (image_url !== undefined) updates.image_url = image_url;

    const { data: post, error } = await supabaseAdmin
      .from('posts')
      .update(updates)
      .eq('id', req.params.id)
      .select(`
        *,
        author:users!posts_user_id_fkey (id, first_name, last_name, avatar_url)
      `)
      .single();

    if (error) throw error;

    res.json({ post });
  }),
);

// ─── DELETE /api/posts/:id ───────────────────────
router.delete(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { data: existing } = await supabaseAdmin
      .from('posts')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.user_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Post deleted' });
  }),
);

export default router;

-- ╔══════════════════════════════════════════════════════════════╗
-- ║  Facebook Clone — Supabase Database Schema                  ║
-- ║  Run this in your Supabase SQL Editor (Dashboard > SQL)     ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ────────────────────────────────────────────────
-- 1. USERS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url    TEXT DEFAULT '',
  date_of_birth DATE,
  gender        VARCHAR(20),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 2. PROFILES TABLE (extended user info)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bio                 TEXT DEFAULT '',
  workplace           VARCHAR(255) DEFAULT '',
  education           VARCHAR(255) DEFAULT '',
  location            VARCHAR(255) DEFAULT '',
  hometown            VARCHAR(255) DEFAULT '',
  relationship_status VARCHAR(50) DEFAULT '',
  cover_url           TEXT DEFAULT '',
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 3. POSTS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       VARCHAR(500) DEFAULT '',
  body        TEXT NOT NULL,
  image_url   TEXT,
  category    VARCHAR(50) DEFAULT 'News',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 4. COMMENTS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id     UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 5. REACTIONS TABLE (likes, love, etc.)
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reactions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id     UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        VARCHAR(20) DEFAULT 'like',
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- ────────────────────────────────────────────────
-- 6. FRIENDSHIPS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS friendships (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status      VARCHAR(20) DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id <> friend_id)
);

-- ────────────────────────────────────────────────
-- 7. GROUPS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS groups (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  privacy     VARCHAR(20) DEFAULT 'public',
  image_url   TEXT,
  created_by  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 8. GROUP MEMBERS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS group_members (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id    UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR(20) DEFAULT 'member',
  joined_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- ────────────────────────────────────────────────
-- 9. NOTIFICATIONS TABLE
-- ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  from_user_id  UUID REFERENCES users(id) ON DELETE SET NULL,
  type          VARCHAR(50) NOT NULL,
  reference_id  UUID,
  message       TEXT NOT NULL,
  read          BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- INDEXES for performance
-- ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_reactions_post_id ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);

-- ────────────────────────────────────────────────
-- AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

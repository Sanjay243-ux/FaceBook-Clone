/**
 * Seed script — populates the Supabase database with demo data.
 * Usage: npm run seed
 */
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import supabaseAdmin from './config/supabase.js';

const DEMO_PASSWORD = await bcrypt.hash('password123', 12);

async function seed() {
  console.log('🌱 Seeding database...\n');

  // 1. Create demo users
  const usersData = [
    { first_name: 'Tech', last_name: 'Admin', email: 'admin@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', gender: 'male' },
    { first_name: 'Sarah', last_name: 'Chen', email: 'sarah@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', gender: 'female' },
    { first_name: 'Alex', last_name: 'Rodriguez', email: 'alex@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', gender: 'male' },
    { first_name: 'Maya', last_name: 'Patel', email: 'maya@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya', gender: 'female' },
    { first_name: 'James', last_name: 'Wilson', email: 'james@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', gender: 'male' },
    { first_name: 'Lisa', last_name: 'Park', email: 'lisa@facebook.com', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', gender: 'female' },
  ];

  const { data: users, error: userErr } = await supabaseAdmin.from('users')
    .upsert(usersData.map(u => ({ ...u, password_hash: DEMO_PASSWORD })), { onConflict: 'email' })
    .select();

  if (userErr) { console.error('User seed error:', userErr); return; }
  console.log(`✅ Created ${users.length} users`);

  const userMap = {};
  users.forEach(u => { userMap[u.email.split('@')[0]] = u.id; });

  // 2. Create profiles
  const profiles = [
    { user_id: userMap.admin, bio: 'Building the future of social tech. #react #developer', workplace: 'TechHub', education: 'University of Tech', location: 'San Francisco, California', hometown: 'New York, New York', relationship_status: 'Single', cover_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
  ];

  const { error: profErr } = await supabaseAdmin.from('profiles').upsert(profiles, { onConflict: 'user_id' });
  if (profErr) console.error('Profile seed error:', profErr);
  else console.log('✅ Created profiles');

  // 3. Create posts
  const postsData = [
    { user_id: userMap.admin, title: 'Update on the new TechHub features', body: 'I just deployed the new Profile page layout. Check it out and let me know what you think. #webdev #react', category: 'News' },
    { user_id: userMap.sarah, title: 'Fix: Windows 11 Wi-Fi Keeps Disconnecting', body: 'Having trouble with your Wi-Fi dropping on Windows 11? Follow these steps to resolve the issue permanently.', category: 'Guides' },
    { user_id: userMap.alex, title: 'Build a REST API with Node.js and Express in 15 Minutes', body: 'In this guide, we walk you through setting up a complete REST API from scratch using Node.js, Express, and MongoDB.', category: 'Tutorials' },
    { user_id: userMap.maya, title: 'Apple Vision Pro 2 Leaks: Thinner, Lighter, and Half the Price', body: "Supply chain sources reveal Apple's next-gen headset will feature micro-OLED displays, an M5 chip, and a dramatically reduced weight.", category: 'News', image_url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop' },
    { user_id: userMap.james, title: 'Docker for Beginners: Containerize Your First App', body: 'Learn the fundamentals of Docker by containerizing a simple web application.', category: 'Tutorials' },
    { user_id: userMap.lisa, title: 'Fix: VS Code Running Slow — 7 Performance Tweaks', body: 'Is VS Code lagging? These 7 proven tweaks will dramatically boost your editor performance.', category: 'Guides' },
  ];

  const { data: posts, error: postErr } = await supabaseAdmin.from('posts').insert(postsData).select();
  if (postErr) console.error('Post seed error:', postErr);
  else console.log(`✅ Created ${posts.length} posts`);

  // 4. Create groups
  const groupsData = [
    { name: 'React Developers Global', description: 'A community for React developers worldwide', privacy: 'public', image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop', created_by: userMap.admin },
    { name: 'UI/UX Design Inspiration', description: 'Share and discover amazing designs', privacy: 'public', image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop', created_by: userMap.sarah },
    { name: 'Cybersecurity Enthusiasts', description: 'Stay updated on security trends', privacy: 'public', image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop', created_by: userMap.alex },
  ];

  const { data: groups, error: grpErr } = await supabaseAdmin.from('groups').insert(groupsData).select();
  if (grpErr) console.error('Group seed error:', grpErr);
  else console.log(`✅ Created ${groups.length} groups`);

  // 5. Create friendships
  const friendships = [
    { user_id: userMap.admin, friend_id: userMap.sarah, status: 'accepted' },
    { user_id: userMap.admin, friend_id: userMap.alex, status: 'accepted' },
    { user_id: userMap.admin, friend_id: userMap.maya, status: 'accepted' },
    { user_id: userMap.admin, friend_id: userMap.james, status: 'accepted' },
    { user_id: userMap.admin, friend_id: userMap.lisa, status: 'accepted' },
    { user_id: userMap.sarah, friend_id: userMap.alex, status: 'accepted' },
  ];

  const { error: friendErr } = await supabaseAdmin.from('friendships').insert(friendships);
  if (friendErr) console.error('Friendship seed error:', friendErr);
  else console.log('✅ Created friendships');

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Demo login: admin@facebook.com / password123');
  process.exit(0);
}

seed().catch(err => { console.error('Seed failed:', err); process.exit(1); });

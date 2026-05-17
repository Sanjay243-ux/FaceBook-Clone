import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// ─── Supabase Direct Postgres Connection ─────────
// Connection string format: postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
const PROJECT_REF = 'ltbvhvpyxfxbslkmhdph';

// The password from the original .env (the value that was in SUPABASE_URL before we fixed it)
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD || 'sb_publishable_jhLyLYSqqXCii3qUM0UIFg_axYT5H0q';

// Try multiple connection approaches
async function connectToDatabase() {
  // Approach 1: Direct connection string if provided
  if (process.env.DATABASE_URL) {
    console.log('📡 Using DATABASE_URL from .env...');
    const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    return client;
  }

  // Approach 2: Construct connection from Supabase project ref
  // Supabase Postgres is at: db.[ref].supabase.co
  const connectionConfigs = [
    {
      label: 'Supabase Direct (port 5432)',
      host: `db.${PROJECT_REF}.supabase.co`,
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    {
      label: 'Supabase Pooler (port 6543)',
      host: `aws-0-ap-south-1.pooler.supabase.com`,
      port: 6543,
      database: 'postgres',
      user: `postgres.${PROJECT_REF}`,
      password: DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
  ];

  for (const config of connectionConfigs) {
    try {
      console.log(`📡 Trying ${config.label}...`);
      const client = new pg.Client(config);
      await client.connect();
      console.log(`✅ Connected via ${config.label}!\n`);
      return client;
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}\n`);
    }
  }

  return null;
}

async function setupDatabase() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  Facebook Clone — Database Setup                ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  const client = await connectToDatabase();

  if (!client) {
    console.log('\n❌ Could not connect to database.');
    console.log('\n📋 Please add your DATABASE_URL to Backend/.env:');
    console.log('   DATABASE_URL=postgresql://postgres.[ref]:[password]@db.[ref].supabase.co:5432/postgres');
    console.log('\n   Or run the SQL manually in Supabase Dashboard > SQL Editor');
    console.log('   File: Backend/supabase/schema.sql');
    process.exit(1);
  }

  try {
    // Read and execute the schema SQL
    const schemaSQL = fs.readFileSync('supabase/schema.sql', 'utf8');
    
    console.log('🔨 Creating tables...\n');
    await client.query(schemaSQL);
    
    console.log('✅ All tables created successfully!\n');

    // Verify tables exist
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('📊 Tables in database:');
    result.rows.forEach((row, i) => {
      console.log(`   ${i + 1}. ${row.table_name}`);
    });
    console.log(`\n🎉 Total: ${result.rows.length} tables created!\n`);

  } catch (err) {
    console.error('❌ Error executing schema:', err.message);
  } finally {
    await client.end();
  }
}

setupDatabase();

const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function checkAndFixSchema() {
  try {
    console.log('🔍 Checking database schema...');
    
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ NEON_DATABASE_URL is not set in .env file');
      return;
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Check if users table exists
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `;
    
    if (tables.length === 0) {
      console.log('❌ Users table does not exist. Creating it...');
      await createUsersTable(sql);
    } else {
      console.log('✅ Users table exists');
      
      // Check table structure
      const columns = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'users' 
        ORDER BY ordinal_position
      `;
      
      console.log('📋 Current users table structure:');
      columns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'}) ${col.column_default ? `default: ${col.column_default}` : ''}`);
      });
      
      // Check if password_hash column exists
      const hasPasswordHash = columns.some(col => col.column_name === 'password_hash');
      
      if (!hasPasswordHash) {
        console.log('❌ password_hash column missing. Adding it...');
        await addPasswordHashColumn(sql);
      } else {
        console.log('✅ password_hash column exists');
      }
      
      // Check constraints
      const constraints = await sql`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints 
        WHERE table_name = 'users'
      `;
      
      console.log('🔒 Table constraints:');
      constraints.forEach(constraint => {
        console.log(`  - ${constraint.constraint_name}: ${constraint.constraint_type}`);
      });
      
      // Check indexes
      const indexes = await sql`
        SELECT indexname, indexdef
        FROM pg_indexes 
        WHERE tablename = 'users'
      `;
      
      console.log('📊 Table indexes:');
      indexes.forEach(index => {
        console.log(`  - ${index.indexname}: ${index.indexdef}`);
      });
    }
    
    // Test the table
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    console.log(`👥 Total users: ${userCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function createUsersTable(sql) {
  await sql`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password_hash TEXT,
      role VARCHAR(50) DEFAULT 'student',
      avatar_url TEXT,
      github_id VARCHAR(255),
      google_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  // Add constraints
  await sql`ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email)`;
  await sql`ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id)`;
  
  // Add indexes
  await sql`CREATE UNIQUE INDEX users_email_key ON users USING BTREE (email)`;
  await sql`CREATE UNIQUE INDEX users_pkey ON users USING BTREE (id)`;
  
  console.log('✅ Users table created successfully with all constraints and indexes');
}

async function addPasswordHashColumn(sql) {
  try {
    await sql`ALTER TABLE users ADD COLUMN password_hash TEXT`;
    console.log('✅ password_hash column added successfully');
    
    // Verify the column was added
    const newColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'password_hash'
    `;
    
    if (newColumns.length > 0) {
      console.log('✅ password_hash column verified successfully');
    } else {
      console.log('❌ Failed to verify password_hash column');
    }
    
  } catch (error) {
    console.error('❌ Error adding password_hash column:', error.message);
  }
}

checkAndFixSchema();

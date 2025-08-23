const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function addMissingColumns() {
  try {
    console.log('🔍 Adding missing columns to users table...');
    
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ NEON_DATABASE_URL is not set in .env file');
      return;
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Check current table structure
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `;
    
    console.log('📋 Current users table structure:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    // Add missing columns if they don't exist
    const existingColumns = columns.map(col => col.column_name);
    
    if (!existingColumns.includes('phone')) {
      console.log('➕ Adding phone column...');
      await sql`ALTER TABLE users ADD COLUMN phone VARCHAR(20)`;
      console.log('✅ phone column added');
    } else {
      console.log('✅ phone column already exists');
    }
    
    if (!existingColumns.includes('linkedin_id')) {
      console.log('➕ Adding linkedin_id column...');
      await sql`ALTER TABLE users ADD COLUMN linkedin_id VARCHAR(255)`;
      console.log('✅ linkedin_id column added');
    } else {
      console.log('✅ linkedin_id column already exists');
    }
    
    // Verify final structure
    const finalColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `;
    
    console.log('\n📋 Final users table structure:');
    finalColumns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    console.log('\n✅ All missing columns added successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addMissingColumns();

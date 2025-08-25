const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function removeTelegramInstagramColumns() {
  try {
    console.log('🔍 Starting migration to remove telegram and instagram columns...');
    
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ NEON_DATABASE_URL is not set in .env file');
      return;
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Check if columns exist before trying to remove them
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'enrollment_submissions' 
      AND column_name IN ('telegram_username', 'instagram_username')
      ORDER BY column_name
    `;
    
    console.log('📋 Found columns to remove:', columns.map(col => col.column_name));
    
    if (columns.length === 0) {
      console.log('✅ No telegram or instagram columns found. Migration not needed.');
      return;
    }
    
    // Remove telegram_username column if it exists
    if (columns.some(col => col.column_name === 'telegram_username')) {
      console.log('🗑️ Removing telegram_username column...');
      await sql`ALTER TABLE enrollment_submissions DROP COLUMN IF EXISTS telegram_username`;
      console.log('✅ telegram_username column removed');
    }
    
    // Remove instagram_username column if it exists
    if (columns.some(col => col.column_name === 'instagram_username')) {
      console.log('🗑️ Removing instagram_username column...');
      await sql`ALTER TABLE enrollment_submissions DROP COLUMN IF EXISTS instagram_username`;
      console.log('✅ instagram_username column removed');
    }
    
    // Verify the columns were removed
    const remainingColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'enrollment_submissions' 
      AND column_name IN ('telegram_username', 'instagram_username')
    `;
    
    if (remainingColumns.length === 0) {
      console.log('✅ Migration completed successfully! Both columns have been removed.');
    } else {
      console.log('⚠️ Some columns still exist:', remainingColumns.map(col => col.column_name));
    }
    
    // Show updated table structure
    const allColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'enrollment_submissions' 
      ORDER BY ordinal_position
    `;
    
    console.log('📋 Updated enrollment_submissions table structure:');
    allColumns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    throw error;
  }
}

// Run the migration
removeTelegramInstagramColumns()
  .then(() => {
    console.log('🎉 Migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });

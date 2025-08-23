const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('📡 Database URL:', process.env.NEON_DATABASE_URL ? 'Set' : 'NOT SET');
    
    if (!process.env.NEON_DATABASE_URL) {
      console.error('❌ NEON_DATABASE_URL is not set in .env file');
      return;
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Test simple query
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connection successful!');
    console.log('⏰ Current time from DB:', result[0].current_time);
    
    // Test if users table exists
    try {
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      `;
      
      if (tables.length > 0) {
        console.log('✅ Users table exists');
        
        // Check user count
        const userCount = await sql`SELECT COUNT(*) as count FROM users`;
        console.log(`👥 Total users: ${userCount[0].count}`);
      } else {
        console.log('❌ Users table does not exist');
      }
    } catch (tableError) {
      console.error('❌ Error checking tables:', tableError.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Make sure your NEON_DATABASE_URL is correct');
  }
}

testConnection();

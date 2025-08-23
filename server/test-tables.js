const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.NEON_DATABASE_URL);

async function testTables() {
  try {
    console.log('🔍 Testing database tables...\n');

    // Test contact_submissions table
    console.log('📝 Testing contact_submissions table...');
    const contactResult = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'contact_submissions'
      ORDER BY ordinal_position
    `;
    
    if (contactResult.length > 0) {
      console.log('✅ contact_submissions table exists with columns:');
      contactResult.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(nullable)'}`);
      });
    } else {
      console.log('❌ contact_submissions table not found');
    }

    console.log('\n📚 Testing enrollment_submissions table...');
    const enrollmentResult = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'enrollment_submissions'
      ORDER BY ordinal_position
    `;
    
    if (enrollmentResult.length > 0) {
      console.log('✅ enrollment_submissions table exists with columns:');
      enrollmentResult.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(nullable)'}`);
      });
    } else {
      console.log('❌ enrollment_submissions table not found');
    }

    // Test inserting sample data
    console.log('\n🧪 Testing data insertion...');
    
    // Test contact submission
    const contactTest = await sql`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES ('Test User', 'test@example.com', 'Test Subject', 'This is a test message')
      RETURNING id, name, email, created_at
    `;
    
    if (contactTest.length > 0) {
      console.log('✅ Contact submission test successful:', contactTest[0]);
      
      // Clean up test data
      await sql`DELETE FROM contact_submissions WHERE id = ${contactTest[0].id}`;
      console.log('🧹 Test contact submission cleaned up');
    }

    // Test enrollment submission
    const enrollmentTest = await sql`
      INSERT INTO enrollment_submissions (
        first_name, last_name, email, phone, address, city, state, country,
        school, degree, field_of_study, graduation_year, current_year,
        technologies, selected_program
      )
      VALUES (
        'Test', 'Student', 'student@example.com', '1234567890', 'Test Address', 'Test City', 'Test State', 'Test Country',
        'Test University', 'Bachelor', 'Computer Science', '2025', '4th Year',
        ARRAY['Python', 'React'], 'Internship Program'
      )
      RETURNING id, first_name, last_name, email, selected_program, created_at
    `;
    
    if (enrollmentTest.length > 0) {
      console.log('✅ Enrollment submission test successful:', enrollmentTest[0]);
      
      // Clean up test data
      await sql`DELETE FROM enrollment_submissions WHERE id = ${enrollmentTest[0].id}`;
      console.log('🧹 Test enrollment submission cleaned up');
    }

    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing tables:', error);
  } finally {
    process.exit(0);
  }
}

testTables();

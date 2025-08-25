import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL!);

export interface DatabaseTables {
  users: any[];
  programs: any[];
  products: any[];
  projects: any[];
  user_programs: any[];
  contact_submissions: any[];
  enrollment_submissions: any[];
}

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash TEXT,
        phone VARCHAR(20),
        role VARCHAR(50) DEFAULT 'student',
        avatar_url TEXT,
        github_id VARCHAR(255),
        linkedin_id VARCHAR(255),
        google_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create programs table
    await sql`
      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        duration VARCHAR(100) NOT NULL,
        price_india DECIMAL(10,2) NOT NULL,
        price_global DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        region VARCHAR(50) DEFAULT 'global',
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(255),
        link TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'in_progress',
        github_url TEXT,
        live_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create user_programs junction table
    await sql`
      CREATE TABLE IF NOT EXISTS user_programs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completion_date TIMESTAMP,
        progress INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'enrolled',
        UNIQUE(user_id, program_id)
      )
    `;

    // Create contact_submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        responded_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create enrollment_submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS enrollment_submissions (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        linkedin_url TEXT,
        github_url TEXT,
        resume_filename TEXT,
        school VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        field_of_study VARCHAR(255) NOT NULL,
        graduation_year VARCHAR(10) NOT NULL,
        current_year VARCHAR(50) NOT NULL,
        technologies TEXT[] NOT NULL,
        selected_program VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        reviewed_at TIMESTAMP,
        reviewed_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Database tables created successfully');
    
    // Only insert sample data if tables are empty
    await insertSampleDataIfEmpty();
    
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

const insertSamplePrograms = async (): Promise<void> => {
  const samplePrograms = [
    {
      title: 'AI/ML Internship Program',
      description: 'Comprehensive 6-month internship focusing on AI/ML development with real-world projects and mentorship.',
      duration: '6 months',
      price_india: 15000,
      price_global: 299,
      category: 'internship',
      region: 'global'
    },
    {
      title: 'Full-Stack Development Fellowship',
      description: 'Advanced fellowship program covering modern web technologies and best practices.',
      duration: '8 months',
      price_india: 20000,
      price_global: 399,
      category: 'fellowship',
      region: 'global'
    },
    {
      title: 'Summer Accelerator Program',
      description: 'Intensive 3-month summer program for rapid skill development and project building.',
      duration: '3 months',
      price_india: 12000,
      price_global: 199,
      category: 'accelerator',
      region: 'global'
    },
    {
      title: 'Winter Bootcamp',
      description: 'Fast-paced winter bootcamp covering essential programming skills and frameworks.',
      duration: '2 months',
      price_india: 8000,
      price_global: 149,
      category: 'bootcamp',
      region: 'global'
    },
    {
      title: 'International Tech Exchange',
      description: 'Global program connecting students with international tech companies and mentors.',
      duration: '12 months',
      price_india: 35000,
      price_global: 599,
      category: 'international',
      region: 'global'
    }
  ];

  for (const program of samplePrograms) {
    await sql`
      INSERT INTO programs (title, description, duration, price_india, price_global, category, region)
      VALUES (${program.title}, ${program.description}, ${program.duration}, ${program.price_india}, ${program.price_global}, ${program.category}, ${program.region})
      ON CONFLICT DO NOTHING
    `;
  }
};

const insertSampleDataIfEmpty = async (): Promise<void> => {
  try {
    // Check if programs table is empty
    const programCount = await sql`SELECT COUNT(*) as count FROM programs`;
    const isProgramsEmpty = parseInt(programCount[0].count) === 0;
    
    // Check if products table is empty
    const productCount = await sql`SELECT COUNT(*) as count FROM products`;
    const isProductsEmpty = parseInt(productCount[0].count) === 0;
    
    // Only insert sample data if tables are empty
    if (isProgramsEmpty) {
      console.log('📚 Inserting sample programs...');
      await insertSamplePrograms();
      console.log('✅ Sample programs inserted');
    } else {
      console.log('📚 Programs table already has data, skipping sample insertion');
    }
    
    if (isProductsEmpty) {
      console.log('🛍️ Inserting sample products...');
      await insertSampleProducts();
      console.log('✅ Sample products inserted');
    } else {
      console.log('🛍️ Products table already has data, skipping sample insertion');
    }
    
  } catch (error) {
    console.error('❌ Error checking/inserting sample data:', error);
  }
};

const insertSampleProducts = async (): Promise<void> => {
  const sampleProducts = [
    {
      name: 'Invest Local',
      description: 'Platform for local investment opportunities and community-driven projects.',
      icon: '💼',
      link: '/products/invest-local'
    },
    {
      name: 'Fundalytics',
      description: 'Advanced analytics and insights for investment decision making.',
      icon: '📊',
      link: '/products/fundalytics'
    },
    {
      name: 'ERLTC',
      description: 'Enterprise Resource Learning and Training Center for corporate skill development.',
      icon: '🏢',
      link: '/products/erltc'
    }
  ];

  for (const product of sampleProducts) {
    await sql`
      INSERT INTO products (name, description, icon, link)
      VALUES (${product.name}, ${product.description}, ${product.icon}, ${product.link})
      ON CONFLICT DO NOTHING
    `;
  }
};

// Function to manually reset sample data (useful for development/testing)
export const resetSampleData = async (): Promise<void> => {
  try {
    console.log('🔄 Resetting sample data...');
    
    // Clear existing data
    await sql`DELETE FROM user_programs`;
    await sql`DELETE FROM projects`;
    await sql`DELETE FROM programs`;
    await sql`DELETE FROM products`;
    
    // Reset auto-increment counters
    await sql`ALTER SEQUENCE programs_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE products_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE projects_id_seq RESTART WITH 1`;
    await sql`ALTER SEQUENCE user_programs_id_seq RESTART WITH 1`;
    
    // Insert fresh sample data
    await insertSamplePrograms();
    await insertSampleProducts();
    
    console.log('✅ Sample data reset successfully');
  } catch (error) {
    console.error('❌ Error resetting sample data:', error);
  }
};

export { sql };

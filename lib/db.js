import { Pool } from 'pg';

let pool = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL || 'postgresql://localhost:5432/elizian',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function query(text, params) {
  const pool = getPool();
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  const pool = getPool();
  
  try {
    // Create tables
    await pool.query(`
      -- Site Settings table
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Membership Tiers table
      CREATE TABLE IF NOT EXISTS membership_tiers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        subtitle VARCHAR(200),
        headline VARCHAR(200),
        description TEXT,
        multiplier VARCHAR(10) NOT NULL,
        min_tokens INTEGER DEFAULT 0,
        min_spend INTEGER DEFAULT 0,
        min_visits INTEGER DEFAULT 0,
        instant_upgrade_amount INTEGER DEFAULT 0,
        icon_url TEXT,
        bg_color VARCHAR(50),
        text_color VARCHAR(50) DEFAULT 'white',
        button_style VARCHAR(50) DEFAULT 'dark',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tier Benefits table
      CREATE TABLE IF NOT EXISTS tier_benefits (
        id SERIAL PRIMARY KEY,
        tier_id INTEGER REFERENCES membership_tiers(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        icon_name VARCHAR(100),
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Service Categories table
      CREATE TABLE IF NOT EXISTS service_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(200),
        icon_name VARCHAR(100),
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Pages/Content table (for terms, privacy, blogs, stories)
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(200) UNIQUE NOT NULL,
        title VARCHAR(300) NOT NULL,
        content TEXT,
        page_type VARCHAR(50) NOT NULL,
        featured_image TEXT,
        meta_description TEXT,
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Media Library table
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(300) NOT NULL,
        url TEXT NOT NULL,
        file_type VARCHAR(100),
        file_size INTEGER,
        alt_text VARCHAR(300),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Admin Users table
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(200) UNIQUE NOT NULL,
        password_hash VARCHAR(300) NOT NULL,
        name VARCHAR(200),
        role VARCHAR(50) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database tables created successfully');
    
    // Insert default settings if not exist
    await insertDefaultSettings();
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

async function insertDefaultSettings() {
  const pool = getPool();
  
  const defaultSettings = [
    {
      key: 'brand',
      value: {
        name: 'Elizian',
        logoUrl: '',
        tagline: 'Experience Luxury.',
        taglineAccent: 'Own Prestige.',
        subTagline: 'Your gateway to lifestyle rewards, powered by blockchain.',
        tokenName: 'EZT',
        tokenFullName: 'EZ Tokens'
      }
    },
    {
      key: 'social_links',
      value: {
        twitter: 'https://twitter.com/elizian',
        instagram: 'https://instagram.com/elizian',
        discord: 'https://discord.gg/elizian',
        linkedin: '',
        youtube: '',
        tiktok: ''
      }
    },
    {
      key: 'app_links',
      value: {
        ios: 'https://apps.apple.com/app/elizian',
        android: 'https://play.google.com/store/apps/details?id=com.elizian',
        web: ''
      }
    },
    {
      key: 'hero',
      value: {
        backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80',
        headline: 'The way to experience',
        headlineAccent: 'Luxury',
        showPartnerButton: true,
        showDownloadButton: true
      }
    },
    {
      key: 'footer',
      value: {
        copyrightText: '© 2025 Elizian. All rights reserved.',
        tagline: 'Powered by blockchain technology',
        contactEmail: 'support@elizian.com'
      }
    },
    {
      key: 'partner_console',
      value: {
        url: '/partner',
        enabled: true
      }
    }
  ];

  for (const setting of defaultSettings) {
    await pool.query(
      `INSERT INTO site_settings (key, value) VALUES ($1, $2) 
       ON CONFLICT (key) DO NOTHING`,
      [setting.key, JSON.stringify(setting.value)]
    );
  }

  // Insert default membership tiers (Blackbird style)
  const tiersExist = await pool.query('SELECT COUNT(*) FROM membership_tiers');
  if (parseInt(tiersExist.rows[0].count) === 0) {
    const defaultTiers = [
      {
        name: 'Aether',
        subtitle: 'The Beginning',
        headline: '$EZT with us',
        description: 'Start earning rewards when you join Elizian.',
        multiplier: '1x',
        min_tokens: 0,
        min_spend: 0,
        min_visits: 0,
        instant_upgrade_amount: 0,
        icon_url: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/hc8c4iqt_Aether.png',
        bg_color: '#FFFFFF',
        text_color: 'dark',
        button_style: 'yellow',
        sort_order: 1
      },
      {
        name: 'Nova',
        subtitle: 'Rising Star',
        headline: 'Become a Regular',
        description: 'Keep experiencing, keep earning. More $EZT coming up.',
        multiplier: '1.5x',
        min_tokens: 2500,
        min_spend: 500,
        min_visits: 5,
        instant_upgrade_amount: 500,
        icon_url: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/bh5myaou_nova.png',
        bg_color: '#FFDA37',
        text_color: 'dark',
        button_style: 'dark',
        sort_order: 2
      },
      {
        name: 'Luminar',
        subtitle: 'Illuminated',
        headline: 'Reach Club Status',
        description: 'Your luxury love speaks for itself. Welcome to the club, you legend.',
        multiplier: '2x',
        min_tokens: 10000,
        min_spend: 5000,
        min_visits: 25,
        instant_upgrade_amount: 5000,
        icon_url: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/fchzo3ua_luminar.png',
        bg_color: '#521FE8',
        text_color: 'light',
        button_style: 'outline-light',
        sort_order: 3
      },
      {
        name: 'Valiant',
        subtitle: 'Distinguished',
        headline: 'Elite Access',
        description: 'Experience the extraordinary. Your status opens doors.',
        multiplier: '3x',
        min_tokens: 50000,
        min_spend: 10000,
        min_visits: 40,
        instant_upgrade_amount: 10000,
        icon_url: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/rc77bhsc_valiant.png',
        bg_color: '#8B5CF6',
        text_color: 'light',
        button_style: 'outline-light',
        sort_order: 4
      },
      {
        name: 'Echelon',
        subtitle: 'The Pinnacle',
        headline: 'Arrive at the Top',
        description: 'Yo, VIP. Let\'s kick it.',
        multiplier: '5x',
        min_tokens: 150000,
        min_spend: 15000,
        min_visits: 50,
        instant_upgrade_amount: 15000,
        icon_url: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/sczo6o2p_echelon.png',
        bg_color: '#1A1A1A',
        text_color: 'light',
        button_style: 'outline-light',
        sort_order: 5
      }
    ];

    for (const tier of defaultTiers) {
      const result = await pool.query(
        `INSERT INTO membership_tiers 
         (name, subtitle, headline, description, multiplier, min_tokens, min_spend, min_visits, instant_upgrade_amount, icon_url, bg_color, text_color, button_style, sort_order) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
        [tier.name, tier.subtitle, tier.headline, tier.description, tier.multiplier, tier.min_tokens, tier.min_spend, tier.min_visits, tier.instant_upgrade_amount, tier.icon_url, tier.bg_color, tier.text_color, tier.button_style, tier.sort_order]
      );
      
      // Add default benefits for each tier
      const tierId = result.rows[0].id;
      const benefits = getDefaultBenefitsForTier(tier.name, tier.multiplier);
      for (let i = 0; i < benefits.length; i++) {
        await pool.query(
          `INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES ($1, $2, $3, $4, $5)`,
          [tierId, benefits[i].title, benefits[i].description, benefits[i].icon_name, i + 1]
        );
      }
    }
  }

  // Insert default service categories
  const categoriesExist = await pool.query('SELECT COUNT(*) FROM service_categories');
  if (parseInt(categoriesExist.rows[0].count) === 0) {
    const defaultCategories = [
      { name: 'Fine Dining', description: 'Michelin-starred experiences', icon_name: 'Utensils', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', sort_order: 1 },
      { name: 'Exclusive Events', description: 'Private gatherings & galas', icon_name: 'CalendarDays', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', sort_order: 2 },
      { name: 'Premium Healthcare', description: 'Concierge medical services', icon_name: 'Heart', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop', sort_order: 3 },
      { name: 'Luxury Spa', description: 'World-class rejuvenation', icon_name: 'Sparkle', image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', sort_order: 4 },
      { name: 'Elite Wellness', description: 'Holistic luxury retreats', icon_name: 'Gem', image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', sort_order: 5 },
      { name: 'Private Travel', description: 'Bespoke journeys worldwide', icon_name: 'Plane', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop', sort_order: 6 }
    ];

    for (const cat of defaultCategories) {
      await pool.query(
        `INSERT INTO service_categories (name, description, icon_name, image_url, sort_order) VALUES ($1, $2, $3, $4, $5)`,
        [cat.name, cat.description, cat.icon_name, cat.image_url, cat.sort_order]
      );
    }
  }

  console.log('Default settings inserted');
}

function getDefaultBenefitsForTier(tierName, multiplier) {
  const baseBenefits = [
    { title: `${multiplier} $EZT`, description: `Earn ${multiplier.replace('x', '')} point${multiplier !== '1x' ? 's' : ''} for every dollar spent using Elizian.`, icon_name: 'Coins' }
  ];

  switch(tierName) {
    case 'Aether':
      return baseBenefits;
    case 'Nova':
      return [
        ...baseBenefits,
        { title: 'Insider Access', description: 'Get pre-sale access to exclusive Elizian sponsored experiences and events.', icon_name: 'Utensils' }
      ];
    case 'Luminar':
      return [
        { title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        ...baseBenefits,
        { title: 'Insider Access', description: 'Priority access to exclusive Elizian experiences and events.', icon_name: 'Utensils' }
      ];
    case 'Valiant':
      return [
        { title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        ...baseBenefits,
        { title: 'Priority Access', description: 'First access to exclusive Elizian experiences and events.', icon_name: 'Utensils' },
        { title: 'Personal Curator', description: 'Dedicated lifestyle curator for bespoke experiences.', icon_name: 'User' }
      ];
    case 'Echelon':
      return [
        { title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        ...baseBenefits,
        { title: 'Ultimate Access', description: 'First access to exclusive Elizian experiences and events.', icon_name: 'Utensils' },
        { title: 'Elite Concierge', description: '24/7 personal concierge for all your luxury needs.', icon_name: 'Crown' }
      ];
    default:
      return baseBenefits;
  }
}

export default { query, getPool, initializeDatabase };

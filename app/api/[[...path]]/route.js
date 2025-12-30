import { NextResponse } from 'next/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// In-memory fallback data when database is not available
const FALLBACK_DATA = {
  settings: {
    brand: {
      name: 'Elizian',
      logoUrl: '',
      tagline: 'Experience Luxury.',
      taglineAccent: 'Own Prestige.',
      subTagline: 'Your gateway to lifestyle rewards, powered by blockchain.',
      tokenName: 'EZT',
      tokenFullName: 'EZ Tokens'
    },
    social_links: {
      twitter: 'https://twitter.com/elizian',
      instagram: 'https://instagram.com/elizian',
      discord: 'https://discord.gg/elizian',
      linkedin: '',
      youtube: '',
      tiktok: ''
    },
    app_links: {
      ios: 'https://apps.apple.com/app/elizian',
      android: 'https://play.google.com/store/apps/details?id=com.elizian',
      web: ''
    },
    hero: {
      backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80',
      headline: 'The way to experience',
      headlineAccent: 'Luxury',
      showPartnerButton: true,
      showDownloadButton: true
    },
    footer: {
      copyrightText: '© 2025 Elizian. All rights reserved.',
      tagline: 'Powered by blockchain technology',
      contactEmail: 'support@elizian.com'
    },
    partner_console: {
      url: '/partner',
      enabled: true
    }
  },
  tiers: [
    {
      id: 1,
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
      sort_order: 1,
      benefits: [
        { id: 1, title: '1x $EZT', description: 'Earn 1 point for every dollar spent using Elizian.', icon_name: 'Coins' }
      ]
    },
    {
      id: 2,
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
      sort_order: 2,
      benefits: [
        { id: 2, title: '1.5x $EZT', description: 'Earn 1.5 points for every dollar spent using Elizian.', icon_name: 'Coins' },
        { id: 3, title: 'Insider Access', description: 'Get pre-sale access to exclusive Elizian sponsored experiences and events.', icon_name: 'Utensils' }
      ]
    },
    {
      id: 3,
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
      sort_order: 3,
      benefits: [
        { id: 4, title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        { id: 5, title: '2x $EZT', description: 'Earn 2 points for every dollar spent using Elizian.', icon_name: 'Coins' },
        { id: 6, title: 'Insider Access', description: 'Priority access to exclusive Elizian experiences and events.', icon_name: 'Utensils' }
      ]
    },
    {
      id: 4,
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
      sort_order: 4,
      benefits: [
        { id: 7, title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        { id: 8, title: '3x $EZT', description: 'Earn 3 points for every dollar spent using Elizian.', icon_name: 'Coins' },
        { id: 9, title: 'Priority Access', description: 'First access to exclusive Elizian experiences and events.', icon_name: 'Utensils' },
        { id: 10, title: 'Personal Curator', description: 'Dedicated lifestyle curator for bespoke experiences.', icon_name: 'User' }
      ]
    },
    {
      id: 5,
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
      sort_order: 5,
      benefits: [
        { id: 11, title: 'Guaranteed Reservations', description: 'Get into the best services on Elizian anytime you want—guaranteed.*', icon_name: 'CheckCircle' },
        { id: 12, title: '5x $EZT', description: 'Earn 5 points for every dollar spent using Elizian.', icon_name: 'Coins' },
        { id: 13, title: 'Ultimate Access', description: 'First access to exclusive Elizian experiences and events.', icon_name: 'Utensils' },
        { id: 14, title: 'Elite Concierge', description: '24/7 personal concierge for all your luxury needs.', icon_name: 'Crown' }
      ]
    }
  ],
  categories: [
    { id: 1, name: 'Fine Dining', description: 'Michelin-starred experiences', icon_name: 'Utensils', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', sort_order: 1 },
    { id: 2, name: 'Exclusive Events', description: 'Private gatherings & galas', icon_name: 'CalendarDays', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', sort_order: 2 },
    { id: 3, name: 'Premium Healthcare', description: 'Concierge medical services', icon_name: 'Heart', image_url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop', sort_order: 3 },
    { id: 4, name: 'Luxury Spa', description: 'World-class rejuvenation', icon_name: 'Sparkle', image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', sort_order: 4 },
    { id: 5, name: 'Elite Wellness', description: 'Holistic luxury retreats', icon_name: 'Gem', image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', sort_order: 5 },
    { id: 6, name: 'Private Travel', description: 'Bespoke journeys worldwide', icon_name: 'Plane', image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop', sort_order: 6 }
  ],
  pages: []
};

// Try to import database, but gracefully handle if not available
let db = null;
let dbAvailable = false;

async function initDb() {
  if (db !== null) return dbAvailable;
  
  try {
    const dbModule = await import('@/lib/db');
    db = dbModule;
    await db.initializeDatabase();
    dbAvailable = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database not available, using fallback data:', error.message);
    dbAvailable = false;
  }
  return dbAvailable;
}

const handler = async (request, context) => {
  const { params } = context;
  const path = params?.path?.join('/') || '';
  const method = request.method;

  // Handle OPTIONS preflight
  if (method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  // Try to initialize database
  const useDb = await initDb();

  try {
    // ==================== PUBLIC ENDPOINTS ====================
    
    // Health check
    if (path === 'health' || path === '') {
      return NextResponse.json(
        { 
          status: 'ok', 
          message: 'Elizian API is running', 
          timestamp: new Date().toISOString(),
          database: useDb ? 'connected' : 'using fallback'
        },
        { headers: corsHeaders }
      );
    }

    // Get all site settings (public)
    if (path === 'settings' && method === 'GET') {
      if (useDb) {
        try {
          const result = await db.query('SELECT key, value FROM site_settings');
          const settings = {};
          result.rows.forEach(row => {
            settings[row.key] = row.value;
          });
          return NextResponse.json(settings, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error, using fallback:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.settings, { headers: corsHeaders });
    }

    // Get specific setting
    if (path.startsWith('settings/') && method === 'GET') {
      const key = path.replace('settings/', '');
      if (useDb) {
        try {
          const result = await db.query('SELECT value FROM site_settings WHERE key = $1', [key]);
          if (result.rows.length > 0) {
            return NextResponse.json(result.rows[0].value, { headers: corsHeaders });
          }
        } catch (e) {
          console.log('DB error, using fallback:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.settings[key] || {}, { headers: corsHeaders });
    }

    // Get membership tiers with benefits (public)
    if (path === 'tiers' && method === 'GET') {
      if (useDb) {
        try {
          const tiersResult = await db.query(
            'SELECT * FROM membership_tiers WHERE is_active = true ORDER BY sort_order ASC'
          );
          const tiers = [];
          for (const tier of tiersResult.rows) {
            const benefitsResult = await db.query(
              'SELECT * FROM tier_benefits WHERE tier_id = $1 AND is_active = true ORDER BY sort_order ASC',
              [tier.id]
            );
            tiers.push({ ...tier, benefits: benefitsResult.rows });
          }
          return NextResponse.json(tiers, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error, using fallback:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.tiers, { headers: corsHeaders });
    }

    // Get service categories (public)
    if (path === 'categories' && method === 'GET') {
      if (useDb) {
        try {
          const result = await db.query(
            'SELECT * FROM service_categories WHERE is_active = true ORDER BY sort_order ASC'
          );
          return NextResponse.json(result.rows, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error, using fallback:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.categories, { headers: corsHeaders });
    }

    // Get pages by type (public)
    if (path.startsWith('pages/type/') && method === 'GET') {
      const pageType = path.replace('pages/type/', '');
      if (useDb) {
        try {
          const result = await db.query(
            'SELECT id, slug, title, content, featured_image, meta_description, published_at FROM pages WHERE page_type = $1 AND is_published = true ORDER BY published_at DESC',
            [pageType]
          );
          return NextResponse.json(result.rows, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      return NextResponse.json([], { headers: corsHeaders });
    }

    // Partner inquiry (public)
    if (path === 'partner-inquiry' && method === 'POST') {
      const body = await request.json();
      const { businessName, email, category } = body;
      
      if (!businessName || !email || !category) {
        return NextResponse.json(
          { error: 'Business name, email, and category are required' },
          { status: 400, headers: corsHeaders }
        );
      }
      
      return NextResponse.json(
        { success: true, message: 'Partner inquiry submitted successfully' },
        { headers: corsHeaders }
      );
    }

    // ==================== ADMIN ENDPOINTS ====================

    // Admin: Update setting
    if (path.startsWith('admin/settings/') && method === 'PUT') {
      const key = path.replace('admin/settings/', '');
      const body = await request.json();
      
      if (useDb) {
        try {
          await db.query(
            'UPDATE site_settings SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
            [JSON.stringify(body), key]
          );
          return NextResponse.json({ success: true, message: 'Setting updated' }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      // Update fallback data
      FALLBACK_DATA.settings[key] = body;
      return NextResponse.json({ success: true, message: 'Setting updated (in memory)' }, { headers: corsHeaders });
    }

    // Admin: Get all tiers (including inactive)
    if (path === 'admin/tiers' && method === 'GET') {
      if (useDb) {
        try {
          const tiersResult = await db.query('SELECT * FROM membership_tiers ORDER BY sort_order ASC');
          const tiers = [];
          for (const tier of tiersResult.rows) {
            const benefitsResult = await db.query(
              'SELECT * FROM tier_benefits WHERE tier_id = $1 ORDER BY sort_order ASC',
              [tier.id]
            );
            tiers.push({ ...tier, benefits: benefitsResult.rows });
          }
          return NextResponse.json(tiers, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error, using fallback:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.tiers, { headers: corsHeaders });
    }

    // Admin: Create tier
    if (path === 'admin/tiers' && method === 'POST') {
      const body = await request.json();
      
      if (useDb) {
        try {
          const result = await db.query(
            `INSERT INTO membership_tiers 
             (name, subtitle, headline, description, multiplier, min_tokens, min_spend, min_visits, instant_upgrade_amount, icon_url, bg_color, text_color, button_style, sort_order, is_active) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
            [body.name, body.subtitle, body.headline, body.description, body.multiplier, 
             body.min_tokens || 0, body.min_spend || 0, body.min_visits || 0, body.instant_upgrade_amount || 0,
             body.icon_url, body.bg_color, body.text_color, body.button_style, body.sort_order || 0, body.is_active !== false]
          );
          return NextResponse.json(result.rows[0], { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      // Add to fallback
      const newTier = { ...body, id: Date.now(), benefits: [] };
      FALLBACK_DATA.tiers.push(newTier);
      return NextResponse.json(newTier, { headers: corsHeaders });
    }

    // Admin: Update tier
    if (path.startsWith('admin/tiers/') && !path.includes('/benefits') && method === 'PUT') {
      const tierId = path.replace('admin/tiers/', '');
      const body = await request.json();
      
      if (useDb) {
        try {
          await db.query(
            `UPDATE membership_tiers SET 
             name = $1, subtitle = $2, headline = $3, description = $4, multiplier = $5, 
             min_tokens = $6, min_spend = $7, min_visits = $8, instant_upgrade_amount = $9,
             icon_url = $10, bg_color = $11, text_color = $12, button_style = $13, 
             sort_order = $14, is_active = $15, updated_at = CURRENT_TIMESTAMP
             WHERE id = $16`,
            [body.name, body.subtitle, body.headline, body.description, body.multiplier,
             body.min_tokens, body.min_spend, body.min_visits, body.instant_upgrade_amount,
             body.icon_url, body.bg_color, body.text_color, body.button_style,
             body.sort_order, body.is_active, tierId]
          );
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      // Update fallback
      const idx = FALLBACK_DATA.tiers.findIndex(t => t.id == tierId);
      if (idx >= 0) {
        FALLBACK_DATA.tiers[idx] = { ...FALLBACK_DATA.tiers[idx], ...body };
      }
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete tier
    if (path.startsWith('admin/tiers/') && !path.includes('/benefits') && method === 'DELETE') {
      const tierId = path.replace('admin/tiers/', '');
      
      if (useDb) {
        try {
          await db.query('DELETE FROM membership_tiers WHERE id = $1', [tierId]);
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      FALLBACK_DATA.tiers = FALLBACK_DATA.tiers.filter(t => t.id != tierId);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Add benefit to tier
    if (path.match(/admin\/tiers\/\d+\/benefits$/) && method === 'POST') {
      const tierId = path.split('/')[2];
      const body = await request.json();
      
      if (useDb) {
        try {
          const result = await db.query(
            'INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [tierId, body.title, body.description, body.icon_name, body.sort_order || 0]
          );
          return NextResponse.json(result.rows[0], { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      const newBenefit = { ...body, id: Date.now(), tier_id: tierId };
      const tier = FALLBACK_DATA.tiers.find(t => t.id == tierId);
      if (tier) tier.benefits.push(newBenefit);
      return NextResponse.json(newBenefit, { headers: corsHeaders });
    }

    // Admin: Update benefit
    if (path.startsWith('admin/benefits/') && method === 'PUT') {
      const benefitId = path.replace('admin/benefits/', '');
      const body = await request.json();
      
      if (useDb) {
        try {
          await db.query(
            'UPDATE tier_benefits SET title = $1, description = $2, icon_name = $3, sort_order = $4, is_active = $5 WHERE id = $6',
            [body.title, body.description, body.icon_name, body.sort_order, body.is_active, benefitId]
          );
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      for (const tier of FALLBACK_DATA.tiers) {
        const idx = tier.benefits.findIndex(b => b.id == benefitId);
        if (idx >= 0) {
          tier.benefits[idx] = { ...tier.benefits[idx], ...body };
          break;
        }
      }
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete benefit
    if (path.startsWith('admin/benefits/') && method === 'DELETE') {
      const benefitId = path.replace('admin/benefits/', '');
      
      if (useDb) {
        try {
          await db.query('DELETE FROM tier_benefits WHERE id = $1', [benefitId]);
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      for (const tier of FALLBACK_DATA.tiers) {
        tier.benefits = tier.benefits.filter(b => b.id != benefitId);
      }
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Get all categories
    if (path === 'admin/categories' && method === 'GET') {
      if (useDb) {
        try {
          const result = await db.query('SELECT * FROM service_categories ORDER BY sort_order ASC');
          return NextResponse.json(result.rows, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.categories, { headers: corsHeaders });
    }

    // Admin: Create category
    if (path === 'admin/categories' && method === 'POST') {
      const body = await request.json();
      
      if (useDb) {
        try {
          const result = await db.query(
            'INSERT INTO service_categories (name, description, icon_name, image_url, sort_order, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [body.name, body.description, body.icon_name, body.image_url, body.sort_order || 0, body.is_active !== false]
          );
          return NextResponse.json(result.rows[0], { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      const newCat = { ...body, id: Date.now() };
      FALLBACK_DATA.categories.push(newCat);
      return NextResponse.json(newCat, { headers: corsHeaders });
    }

    // Admin: Update category
    if (path.startsWith('admin/categories/') && method === 'PUT') {
      const categoryId = path.replace('admin/categories/', '');
      const body = await request.json();
      
      if (useDb) {
        try {
          await db.query(
            'UPDATE service_categories SET name = $1, description = $2, icon_name = $3, image_url = $4, sort_order = $5, is_active = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7',
            [body.name, body.description, body.icon_name, body.image_url, body.sort_order, body.is_active, categoryId]
          );
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      const idx = FALLBACK_DATA.categories.findIndex(c => c.id == categoryId);
      if (idx >= 0) FALLBACK_DATA.categories[idx] = { ...FALLBACK_DATA.categories[idx], ...body };
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete category
    if (path.startsWith('admin/categories/') && method === 'DELETE') {
      const categoryId = path.replace('admin/categories/', '');
      
      if (useDb) {
        try {
          await db.query('DELETE FROM service_categories WHERE id = $1', [categoryId]);
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      FALLBACK_DATA.categories = FALLBACK_DATA.categories.filter(c => c.id != categoryId);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Get all pages
    if (path === 'admin/pages' && method === 'GET') {
      if (useDb) {
        try {
          const result = await db.query('SELECT * FROM pages ORDER BY created_at DESC');
          return NextResponse.json(result.rows, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      return NextResponse.json(FALLBACK_DATA.pages, { headers: corsHeaders });
    }

    // Admin: Create page
    if (path === 'admin/pages' && method === 'POST') {
      const body = await request.json();
      const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      if (useDb) {
        try {
          const result = await db.query(
            `INSERT INTO pages (slug, title, content, page_type, featured_image, meta_description, is_published, published_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [slug, body.title, body.content, body.page_type, body.featured_image, body.meta_description, 
             body.is_published || false, body.is_published ? new Date() : null]
          );
          return NextResponse.json(result.rows[0], { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      const newPage = { ...body, id: Date.now(), slug };
      FALLBACK_DATA.pages.push(newPage);
      return NextResponse.json(newPage, { headers: corsHeaders });
    }

    // Admin: Update page
    if (path.startsWith('admin/pages/') && method === 'PUT') {
      const pageId = path.replace('admin/pages/', '');
      const body = await request.json();
      
      if (useDb) {
        try {
          await db.query(
            `UPDATE pages SET title = $1, content = $2, page_type = $3, featured_image = $4, 
             meta_description = $5, is_published = $6, published_at = $7, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $8`,
            [body.title, body.content, body.page_type, body.featured_image, body.meta_description,
             body.is_published, body.is_published && !body.published_at ? new Date() : body.published_at, pageId]
          );
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      const idx = FALLBACK_DATA.pages.findIndex(p => p.id == pageId);
      if (idx >= 0) FALLBACK_DATA.pages[idx] = { ...FALLBACK_DATA.pages[idx], ...body };
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete page
    if (path.startsWith('admin/pages/') && method === 'DELETE') {
      const pageId = path.replace('admin/pages/', '');
      
      if (useDb) {
        try {
          await db.query('DELETE FROM pages WHERE id = $1', [pageId]);
          return NextResponse.json({ success: true }, { headers: corsHeaders });
        } catch (e) {
          console.log('DB error:', e.message);
        }
      }
      
      FALLBACK_DATA.pages = FALLBACK_DATA.pages.filter(p => p.id != pageId);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // 404 for unknown routes
    return NextResponse.json(
      { error: 'Endpoint not found', path },
      { status: 404, headers: corsHeaders }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;

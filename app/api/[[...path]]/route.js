import { NextResponse } from 'next/server';
import { query, initializeDatabase, getPool } from '@/lib/db';
import bcrypt from 'bcryptjs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Initialize database on first request
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }
}

const handler = async (request, context) => {
  const { params } = context;
  const path = params?.path?.join('/') || '';
  const method = request.method;

  // Handle OPTIONS preflight
  if (method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  // Initialize database
  await ensureDbInitialized();

  try {
    // ==================== PUBLIC ENDPOINTS ====================
    
    // Health check
    if (path === 'health' || path === '') {
      return NextResponse.json(
        { status: 'ok', message: 'Elizian API is running', timestamp: new Date().toISOString() },
        { headers: corsHeaders }
      );
    }

    // Get all site settings (public)
    if (path === 'settings' && method === 'GET') {
      const result = await query('SELECT key, value FROM site_settings');
      const settings = {};
      result.rows.forEach(row => {
        settings[row.key] = row.value;
      });
      return NextResponse.json(settings, { headers: corsHeaders });
    }

    // Get specific setting
    if (path.startsWith('settings/') && method === 'GET') {
      const key = path.replace('settings/', '');
      const result = await query('SELECT value FROM site_settings WHERE key = $1', [key]);
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Setting not found' }, { status: 404, headers: corsHeaders });
      }
      return NextResponse.json(result.rows[0].value, { headers: corsHeaders });
    }

    // Get membership tiers with benefits (public)
    if (path === 'tiers' && method === 'GET') {
      const tiersResult = await query(
        'SELECT * FROM membership_tiers WHERE is_active = true ORDER BY sort_order ASC'
      );
      
      const tiers = [];
      for (const tier of tiersResult.rows) {
        const benefitsResult = await query(
          'SELECT * FROM tier_benefits WHERE tier_id = $1 AND is_active = true ORDER BY sort_order ASC',
          [tier.id]
        );
        tiers.push({
          ...tier,
          benefits: benefitsResult.rows
        });
      }
      
      return NextResponse.json(tiers, { headers: corsHeaders });
    }

    // Get service categories (public)
    if (path === 'categories' && method === 'GET') {
      const result = await query(
        'SELECT * FROM service_categories WHERE is_active = true ORDER BY sort_order ASC'
      );
      return NextResponse.json(result.rows, { headers: corsHeaders });
    }

    // Get pages by type (public)
    if (path.startsWith('pages/type/') && method === 'GET') {
      const pageType = path.replace('pages/type/', '');
      const result = await query(
        'SELECT id, slug, title, content, featured_image, meta_description, published_at FROM pages WHERE page_type = $1 AND is_published = true ORDER BY published_at DESC',
        [pageType]
      );
      return NextResponse.json(result.rows, { headers: corsHeaders });
    }

    // Get single page by slug (public)
    if (path.startsWith('pages/') && !path.includes('type/') && method === 'GET') {
      const slug = path.replace('pages/', '');
      const result = await query(
        'SELECT * FROM pages WHERE slug = $1 AND is_published = true',
        [slug]
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404, headers: corsHeaders });
      }
      return NextResponse.json(result.rows[0], { headers: corsHeaders });
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
      
      await query(
        'UPDATE site_settings SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
        [JSON.stringify(body), key]
      );
      
      return NextResponse.json({ success: true, message: 'Setting updated' }, { headers: corsHeaders });
    }

    // Admin: Get all tiers (including inactive)
    if (path === 'admin/tiers' && method === 'GET') {
      const tiersResult = await query('SELECT * FROM membership_tiers ORDER BY sort_order ASC');
      const tiers = [];
      for (const tier of tiersResult.rows) {
        const benefitsResult = await query(
          'SELECT * FROM tier_benefits WHERE tier_id = $1 ORDER BY sort_order ASC',
          [tier.id]
        );
        tiers.push({ ...tier, benefits: benefitsResult.rows });
      }
      return NextResponse.json(tiers, { headers: corsHeaders });
    }

    // Admin: Create tier
    if (path === 'admin/tiers' && method === 'POST') {
      const body = await request.json();
      const result = await query(
        `INSERT INTO membership_tiers 
         (name, subtitle, headline, description, multiplier, min_tokens, min_spend, min_visits, instant_upgrade_amount, icon_url, bg_color, text_color, button_style, sort_order, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
        [body.name, body.subtitle, body.headline, body.description, body.multiplier, 
         body.min_tokens || 0, body.min_spend || 0, body.min_visits || 0, body.instant_upgrade_amount || 0,
         body.icon_url, body.bg_color, body.text_color, body.button_style, body.sort_order || 0, body.is_active !== false]
      );
      return NextResponse.json(result.rows[0], { headers: corsHeaders });
    }

    // Admin: Update tier
    if (path.startsWith('admin/tiers/') && !path.includes('/benefits') && method === 'PUT') {
      const tierId = path.replace('admin/tiers/', '');
      const body = await request.json();
      
      await query(
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
    }

    // Admin: Delete tier
    if (path.startsWith('admin/tiers/') && !path.includes('/benefits') && method === 'DELETE') {
      const tierId = path.replace('admin/tiers/', '');
      await query('DELETE FROM membership_tiers WHERE id = $1', [tierId]);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Add benefit to tier
    if (path.match(/admin\/tiers\/\d+\/benefits$/) && method === 'POST') {
      const tierId = path.split('/')[2];
      const body = await request.json();
      
      const result = await query(
        'INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [tierId, body.title, body.description, body.icon_name, body.sort_order || 0]
      );
      
      return NextResponse.json(result.rows[0], { headers: corsHeaders });
    }

    // Admin: Update benefit
    if (path.startsWith('admin/benefits/') && method === 'PUT') {
      const benefitId = path.replace('admin/benefits/', '');
      const body = await request.json();
      
      await query(
        'UPDATE tier_benefits SET title = $1, description = $2, icon_name = $3, sort_order = $4, is_active = $5 WHERE id = $6',
        [body.title, body.description, body.icon_name, body.sort_order, body.is_active, benefitId]
      );
      
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete benefit
    if (path.startsWith('admin/benefits/') && method === 'DELETE') {
      const benefitId = path.replace('admin/benefits/', '');
      await query('DELETE FROM tier_benefits WHERE id = $1', [benefitId]);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Get all categories
    if (path === 'admin/categories' && method === 'GET') {
      const result = await query('SELECT * FROM service_categories ORDER BY sort_order ASC');
      return NextResponse.json(result.rows, { headers: corsHeaders });
    }

    // Admin: Create category
    if (path === 'admin/categories' && method === 'POST') {
      const body = await request.json();
      const result = await query(
        'INSERT INTO service_categories (name, description, icon_name, image_url, sort_order, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [body.name, body.description, body.icon_name, body.image_url, body.sort_order || 0, body.is_active !== false]
      );
      return NextResponse.json(result.rows[0], { headers: corsHeaders });
    }

    // Admin: Update category
    if (path.startsWith('admin/categories/') && method === 'PUT') {
      const categoryId = path.replace('admin/categories/', '');
      const body = await request.json();
      
      await query(
        'UPDATE service_categories SET name = $1, description = $2, icon_name = $3, image_url = $4, sort_order = $5, is_active = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7',
        [body.name, body.description, body.icon_name, body.image_url, body.sort_order, body.is_active, categoryId]
      );
      
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete category
    if (path.startsWith('admin/categories/') && method === 'DELETE') {
      const categoryId = path.replace('admin/categories/', '');
      await query('DELETE FROM service_categories WHERE id = $1', [categoryId]);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Get all pages
    if (path === 'admin/pages' && method === 'GET') {
      const result = await query('SELECT * FROM pages ORDER BY created_at DESC');
      return NextResponse.json(result.rows, { headers: corsHeaders });
    }

    // Admin: Create page
    if (path === 'admin/pages' && method === 'POST') {
      const body = await request.json();
      const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const result = await query(
        `INSERT INTO pages (slug, title, content, page_type, featured_image, meta_description, is_published, published_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [slug, body.title, body.content, body.page_type, body.featured_image, body.meta_description, 
         body.is_published || false, body.is_published ? new Date() : null]
      );
      
      return NextResponse.json(result.rows[0], { headers: corsHeaders });
    }

    // Admin: Update page
    if (path.startsWith('admin/pages/') && method === 'PUT') {
      const pageId = path.replace('admin/pages/', '');
      const body = await request.json();
      
      await query(
        `UPDATE pages SET title = $1, content = $2, page_type = $3, featured_image = $4, 
         meta_description = $5, is_published = $6, published_at = $7, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $8`,
        [body.title, body.content, body.page_type, body.featured_image, body.meta_description,
         body.is_published, body.is_published && !body.published_at ? new Date() : body.published_at, pageId]
      );
      
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Delete page
    if (path.startsWith('admin/pages/') && method === 'DELETE') {
      const pageId = path.replace('admin/pages/', '');
      await query('DELETE FROM pages WHERE id = $1', [pageId]);
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    // Admin: Database initialization (manual trigger)
    if (path === 'admin/init-db' && method === 'POST') {
      await initializeDatabase();
      return NextResponse.json({ success: true, message: 'Database initialized' }, { headers: corsHeaders });
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

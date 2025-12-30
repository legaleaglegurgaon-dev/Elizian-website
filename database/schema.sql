-- Elizian Database Schema for PostgreSQL 16.x
-- Run this script to create all required tables

-- Create database (run this separately if needed)
-- CREATE DATABASE elizian;

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
  bg_color VARCHAR(50) DEFAULT '#FFFFFF',
  text_color VARCHAR(50) DEFAULT 'dark',
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

-- Pages/Content table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_membership_tiers_sort ON membership_tiers(sort_order);
CREATE INDEX IF NOT EXISTS idx_membership_tiers_active ON membership_tiers(is_active);
CREATE INDEX IF NOT EXISTS idx_tier_benefits_tier_id ON tier_benefits(tier_id);
CREATE INDEX IF NOT EXISTS idx_service_categories_sort ON service_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_type ON pages(page_type);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

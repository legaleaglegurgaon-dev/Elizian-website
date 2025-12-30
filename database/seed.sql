-- Elizian Default Data Seed for PostgreSQL 16.x
-- Run this after schema.sql to populate default data

-- Insert default membership tiers
INSERT INTO membership_tiers (name, subtitle, headline, description, multiplier, min_tokens, min_spend, min_visits, instant_upgrade_amount, icon_url, bg_color, text_color, button_style, sort_order) VALUES
('Aether', 'The Beginning', '$EZT with us', 'Start earning rewards when you join Elizian.', '1x', 0, 0, 0, 0, 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/hc8c4iqt_Aether.png', '#FFFFFF', 'dark', 'yellow', 1),
('Nova', 'Rising Star', 'Become a Regular', 'Keep experiencing, keep earning. More $EZT coming up.', '1.5x', 2500, 500, 5, 500, 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/bh5myaou_nova.png', '#FFDA37', 'dark', 'dark', 2),
('Luminar', 'Illuminated', 'Reach Club Status', 'Your luxury love speaks for itself. Welcome to the club, you legend.', '2x', 10000, 5000, 25, 5000, 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/fchzo3ua_luminar.png', '#521FE8', 'light', 'outline-light', 3),
('Valiant', 'Distinguished', 'Elite Access', 'Experience the extraordinary. Your status opens doors.', '3x', 50000, 10000, 40, 10000, 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/rc77bhsc_valiant.png', '#8B5CF6', 'light', 'outline-light', 4),
('Echelon', 'The Pinnacle', 'Arrive at the Top', 'Yo, VIP. Let''s kick it.', '5x', 150000, 15000, 50, 15000, 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/sczo6o2p_echelon.png', '#1A1A1A', 'light', 'outline-light', 5)
ON CONFLICT DO NOTHING;

-- Insert benefits for Aether (tier_id = 1)
INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES
(1, '1x $EZT', 'Earn 1 point for every dollar spent using Elizian.', 'Coins', 1)
ON CONFLICT DO NOTHING;

-- Insert benefits for Nova (tier_id = 2)
INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES
(2, '1.5x $EZT', 'Earn 1.5 points for every dollar spent using Elizian.', 'Coins', 1),
(2, 'Insider Access', 'Get pre-sale access to exclusive Elizian sponsored experiences and events.', 'Utensils', 2)
ON CONFLICT DO NOTHING;

-- Insert benefits for Luminar (tier_id = 3)
INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES
(3, 'Guaranteed Reservations', 'Get into the best services on Elizian anytime you want—guaranteed.*', 'CheckCircle', 1),
(3, '2x $EZT', 'Earn 2 points for every dollar spent using Elizian.', 'Coins', 2),
(3, 'Insider Access', 'Priority access to exclusive Elizian experiences and events.', 'Utensils', 3)
ON CONFLICT DO NOTHING;

-- Insert benefits for Valiant (tier_id = 4)
INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES
(4, 'Guaranteed Reservations', 'Get into the best services on Elizian anytime you want—guaranteed.*', 'CheckCircle', 1),
(4, '3x $EZT', 'Earn 3 points for every dollar spent using Elizian.', 'Coins', 2),
(4, 'Priority Access', 'First access to exclusive Elizian experiences and events.', 'Utensils', 3),
(4, 'Personal Curator', 'Dedicated lifestyle curator for bespoke experiences.', 'User', 4)
ON CONFLICT DO NOTHING;

-- Insert benefits for Echelon (tier_id = 5)
INSERT INTO tier_benefits (tier_id, title, description, icon_name, sort_order) VALUES
(5, 'Guaranteed Reservations', 'Get into the best services on Elizian anytime you want—guaranteed.*', 'CheckCircle', 1),
(5, '5x $EZT', 'Earn 5 points for every dollar spent using Elizian.', 'Coins', 2),
(5, 'Ultimate Access', 'First access to exclusive Elizian experiences and events.', 'Utensils', 3),
(5, 'Elite Concierge', '24/7 personal concierge for all your luxury needs.', 'Crown', 4)
ON CONFLICT DO NOTHING;

-- Insert default service categories
INSERT INTO service_categories (name, description, icon_name, image_url, sort_order) VALUES
('Fine Dining', 'Michelin-starred experiences', 'Utensils', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', 1),
('Exclusive Events', 'Private gatherings & galas', 'CalendarDays', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', 2),
('Premium Healthcare', 'Concierge medical services', 'Heart', 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop', 3),
('Luxury Spa', 'World-class rejuvenation', 'Sparkle', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', 4),
('Elite Wellness', 'Holistic luxury retreats', 'Gem', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', 5),
('Private Travel', 'Bespoke journeys worldwide', 'Plane', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop', 6)
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('brand', '{"name": "Elizian", "logoUrl": "", "tagline": "Experience Luxury.", "taglineAccent": "Own Prestige.", "subTagline": "Your gateway to lifestyle rewards, powered by blockchain.", "tokenName": "EZT", "tokenFullName": "EZ Tokens"}'::jsonb),
('social_links', '{"twitter": "https://twitter.com/elizian", "instagram": "https://instagram.com/elizian", "discord": "https://discord.gg/elizian", "linkedin": "", "youtube": "", "tiktok": ""}'::jsonb),
('app_links', '{"ios": "https://apps.apple.com/app/elizian", "android": "https://play.google.com/store/apps/details?id=com.elizian", "web": ""}'::jsonb),
('hero', '{"backgroundImage": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80", "headline": "The way to experience", "headlineAccent": "Luxury", "showPartnerButton": true, "showDownloadButton": true}'::jsonb),
('footer', '{"copyrightText": "© 2025 Elizian. All rights reserved.", "tagline": "Powered by blockchain technology", "contactEmail": "support@elizian.com"}'::jsonb),
('partner_console', '{"url": "/partner", "enabled": true}'::jsonb)
ON CONFLICT (key) DO NOTHING;

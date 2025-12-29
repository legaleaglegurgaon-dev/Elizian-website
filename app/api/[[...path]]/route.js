import { NextResponse } from 'next/server';

// Simple API handler for Elizian
const handler = async (request, context) => {
  const { params } = context;
  const path = params?.path?.join('/') || '';
  
  // Enable CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Health check endpoint
    if (path === 'health' || path === '') {
      return NextResponse.json(
        { 
          status: 'ok', 
          message: 'Elizian API is running',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        },
        { headers: corsHeaders }
      );
    }

    // Config endpoint - returns customizable site config
    if (path === 'config') {
      return NextResponse.json(
        {
          brandName: 'Elizian',
          tagline: 'Experience Luxury. Own Prestige.',
          subTagline: 'Your gateway to lifestyle rewards, powered by blockchain.',
          tokenName: 'EZT',
          tokenFullName: 'EZ Tokens',
          categories: [
            { name: 'Dining', description: 'Fine dining & restaurants' },
            { name: 'Events', description: 'Exclusive experiences' },
            { name: 'Healthcare', description: 'Premium health services' },
            { name: 'Spa & Salon', description: 'Luxury wellness' },
            { name: 'Wellness', description: 'Mind & body care' },
            { name: 'Travel', description: 'Luxury getaways' },
          ]
        },
        { headers: corsHeaders }
      );
    }

    // Newsletter signup endpoint
    if (path === 'newsletter' && request.method === 'POST') {
      const body = await request.json();
      const { email } = body;
      
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400, headers: corsHeaders }
        );
      }

      // In production, this would save to database
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter',
          email 
        },
        { headers: corsHeaders }
      );
    }

    // Partner inquiry endpoint
    if (path === 'partner-inquiry' && request.method === 'POST') {
      const body = await request.json();
      const { businessName, email, category, message } = body;
      
      if (!businessName || !email || !category) {
        return NextResponse.json(
          { error: 'Business name, email, and category are required' },
          { status: 400, headers: corsHeaders }
        );
      }

      // In production, this would save to database and send notification
      return NextResponse.json(
        { 
          success: true, 
          message: 'Partner inquiry submitted successfully',
          data: { businessName, email, category }
        },
        { headers: corsHeaders }
      );
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

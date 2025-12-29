'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sparkles,
  Wallet,
  Gift,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Star,
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Utensils,
  CalendarDays,
  Heart,
  Sparkle,
  Plane,
  Gem,
  Download,
  Building2,
  Crown,
  Award,
  Diamond,
  Flame,
  Sun,
  Moon,
  Stars
} from 'lucide-react'

// ============ CUSTOMIZABLE CONFIG ============
const CONFIG = {
  // Brand
  brandName: 'Elizian',
  tagline: 'Experience Luxury.',
  taglineAccent: 'Own Prestige.',
  subTagline: 'Your gateway to lifestyle rewards, powered by blockchain.',
  
  // Token
  tokenName: 'EZT',
  tokenFullName: 'EZ Tokens',
  
  // Links (customize these)
  partnerConsoleUrl: '/partner',
  appDownloadUrl: '#download',
  
  // Social Links
  socialLinks: {
    twitter: 'https://twitter.com/elizian',
    instagram: 'https://instagram.com/elizian',
    discord: 'https://discord.gg/elizian',
  },
  
  // Contact
  contactEmail: 'support@elizian.com',
}

// Service Categories with luxury descriptions
const CATEGORIES = [
  { name: 'Fine Dining', icon: Utensils, description: 'Michelin-starred experiences', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop' },
  { name: 'Exclusive Events', icon: CalendarDays, description: 'Private gatherings & galas', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop' },
  { name: 'Premium Healthcare', icon: Heart, description: 'Concierge medical services', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop' },
  { name: 'Luxury Spa', icon: Sparkle, description: 'World-class rejuvenation', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop' },
  { name: 'Elite Wellness', icon: Gem, description: 'Holistic luxury retreats', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop' },
  { name: 'Private Travel', icon: Plane, description: 'Bespoke journeys worldwide', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop' },
]

// How it works steps
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Discover',
    description: 'Explore our curated collection of the world\'s finest luxury services.',
    icon: Globe,
  },
  {
    step: '02',
    title: 'Experience',
    description: 'Indulge in exceptional moments crafted by our distinguished partners.',
    icon: Star,
  },
  {
    step: '03',
    title: 'Earn',
    description: 'Receive EZT tokens with every booking, secured on the blockchain.',
    icon: Wallet,
  },
  {
    step: '04',
    title: 'Ascend',
    description: 'Unlock increasingly exclusive tiers and unparalleled privileges.',
    icon: Crown,
  },
]

// 5 Membership Tiers - Aether, Nova, Luminar, Valiant, Echelon
const MEMBERSHIP_TIERS = [
  { 
    name: 'Aether', 
    subtitle: 'The Beginning',
    minTokens: 0, 
    multiplier: '1x', 
    color: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-gradient-to-br from-cyan-900/20 to-blue-900/30',
    borderColor: 'border-cyan-500/30',
    iconUrl: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/hc8c4iqt_Aether.png',
    perks: ['Access to partner network', 'Basic EZT earning rate', 'Standard booking privileges'] 
  },
  { 
    name: 'Nova', 
    subtitle: 'Rising Star',
    minTokens: 2500, 
    multiplier: '1.5x', 
    color: 'from-orange-400 to-amber-600',
    bgColor: 'bg-gradient-to-br from-orange-900/20 to-amber-900/30',
    borderColor: 'border-orange-500/30',
    iconUrl: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/bh5myaou_nova.png',
    perks: ['1.5x EZT earnings', 'Priority reservations', 'Early access to events', 'Member-only experiences'] 
  },
  { 
    name: 'Luminar', 
    subtitle: 'Illuminated',
    minTokens: 10000, 
    multiplier: '2x', 
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-gradient-to-br from-yellow-900/20 to-amber-900/30',
    borderColor: 'border-yellow-500/30',
    iconUrl: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/fchzo3ua_luminar.png',
    perks: ['2x EZT earnings', 'Complimentary upgrades', 'Dedicated concierge', 'VIP event access', 'Exclusive partner perks'] 
  },
  { 
    name: 'Valiant', 
    subtitle: 'Distinguished',
    minTokens: 50000, 
    multiplier: '3x', 
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-gradient-to-br from-orange-900/20 to-red-900/30',
    borderColor: 'border-orange-500/30',
    iconUrl: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/rc77bhsc_valiant.png',
    perks: ['3x EZT earnings', 'Personal lifestyle curator', 'Guaranteed reservations', 'Private experiences', 'Luxury gift packages', 'Global partner access'] 
  },
  { 
    name: 'Echelon', 
    subtitle: 'The Pinnacle',
    minTokens: 150000, 
    multiplier: '5x', 
    color: 'from-yellow-400 to-amber-600',
    bgColor: 'bg-gradient-to-br from-yellow-900/20 to-amber-900/30',
    borderColor: 'border-yellow-400/40',
    iconUrl: 'https://customer-assets.emergentagent.com/job_07bdeb1d-ce27-4eee-a224-d204a4c1a442/artifacts/sczo6o2p_echelon.png',
    perks: ['5x EZT earnings', 'Bespoke experience creation', '24/7 elite concierge', 'Invitation-only events', 'Priority everything', 'Ultimate luxury privileges'] 
  },
]

// Features
const FEATURES = [
  {
    icon: Shield,
    title: 'Blockchain Secured',
    description: 'Your rewards are immutably protected by cutting-edge distributed ledger technology.',
  },
  {
    icon: Zap,
    title: 'Instant Recognition',
    description: 'Earn EZT tokens the moment your transaction completes. No waiting, no hassle.',
  },
  {
    icon: Users,
    title: 'Curated Network',
    description: 'Access an invitation-only collection of the world\'s most prestigious service providers.',
  },
  {
    icon: TrendingUp,
    title: 'Appreciating Value',
    description: 'Your tokens grow in utility as our exclusive ecosystem expands globally.',
  },
]

export default function ElizianLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#141917] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#141917]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-display font-semibold tracking-wide text-gold"
                style={{ color: '#F7E733' }}>
                {CONFIG.brandName}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#experience" className="text-gray-400 hover:text-[#F7E733] transition-colors text-sm tracking-wide">Experience</a>
              <a href="#services" className="text-gray-400 hover:text-[#F7E733] transition-colors text-sm tracking-wide">Services</a>
              <a href="#membership" className="text-gray-400 hover:text-[#F7E733] transition-colors text-sm tracking-wide">Membership</a>
              <a href="#rewards" className="text-gray-400 hover:text-[#F7E733] transition-colors text-sm tracking-wide">Rewards</a>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-full px-6"
                onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
              >
                Become a Partner
              </Button>
              <Button
                className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-6"
                onClick={() => window.location.href = CONFIG.appDownloadUrl}
              >
                Download App
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#141917]/98 backdrop-blur-xl border-t border-white/5">
            <div className="px-4 py-6 space-y-4">
              <a href="#experience" className="block py-2 text-gray-400 hover:text-[#F7E733]">Experience</a>
              <a href="#services" className="block py-2 text-gray-400 hover:text-[#F7E733]">Services</a>
              <a href="#membership" className="block py-2 text-gray-400 hover:text-[#F7E733]">Membership</a>
              <a href="#rewards" className="block py-2 text-gray-400 hover:text-[#F7E733]">Rewards</a>
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-[#F7E733]/50 text-[#F7E733] hover:bg-[#F7E733]/10 rounded-full"
                  onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
                >
                  Become a Partner
                </Button>
                <Button
                  className="w-full bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full"
                  onClick={() => window.location.href = CONFIG.appDownloadUrl}
                >
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Blackbird Inspired with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Art Deco Pattern Overlay */}
        <div className="absolute inset-0 art-deco-fan opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Main Heading - Blackbird Style */}
          <h1 className="mb-8">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/90 mb-4 tracking-wide">
              The way to experience
            </span>
            <span 
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic tracking-wide"
              style={{ color: '#F7E733' }}
            >
              Luxury
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#F7E733]/80 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            {CONFIG.subTagline}
          </p>

          {/* CTA Buttons - Blackbird Style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-normal tracking-wide"
              onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Become a Partner
            </Button>
            <Button
              size="lg"
              className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-8 py-6 text-base tracking-wide"
              onClick={() => window.location.href = CONFIG.appDownloadUrl}
            >
              <Download className="w-4 h-4 mr-2" />
              Download the App
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#F7E733]/50" />
        </div>
      </section>

      {/* Experience Section - How it Works */}
      <section id="experience" className="py-32 relative bg-[#141917]">
        <div className="absolute inset-0 art-deco-pattern opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">The Journey</p>
            <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span className="text-white">How </span>
              <span style={{ color: '#F7E733' }}>{CONFIG.brandName}</span>
              <span className="text-white"> Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Your journey to unparalleled luxury in four seamless steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F7E733]/10 to-transparent border border-[#F7E733]/20 flex items-center justify-center group-hover:border-[#F7E733]/40 transition-all duration-500">
                      <item.icon className="w-10 h-10 text-[#F7E733]" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-xs font-mono text-[#F7E733]/50">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-display italic text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141917] via-[#1a1f1c] to-[#141917]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Our World</p>
            <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span style={{ color: '#F7E733' }}>Curated</span>
              <span className="text-white"> Excellence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Access the world's most distinguished service providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="w-5 h-5 text-[#F7E733]" />
                    <span className="text-[#F7E733] text-xs tracking-[0.2em] uppercase">{category.description}</span>
                  </div>
                  <h3 className="text-2xl font-display italic text-white">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers - Art Deco Inspired Cards */}
      <section id="membership" className="py-32 relative bg-[#0f1311]">
        <div className="absolute inset-0 art-deco-fan opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Membership</p>
            <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span className="text-white">Five Tiers of </span>
              <span style={{ color: '#F7E733' }}>Distinction</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Ascend through our exclusive membership levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {MEMBERSHIP_TIERS.map((tier, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl ${tier.bgColor} border ${tier.borderColor} p-6 transition-all duration-500 hover:scale-[1.02] group membership-card`}
              >
                {/* Tier Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${tier.color} mb-6`}>
                  <tier.icon className="w-4 h-4 text-black" />
                  <span className="text-xs font-semibold text-black tracking-wide">{tier.multiplier}</span>
                </div>
                
                <h3 className="text-2xl font-display italic text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{tier.subtitle}</p>
                <p className="text-xs text-[#F7E733]/60 mb-6">
                  {tier.minTokens === 0 ? 'Start here' : `${tier.minTokens.toLocaleString()} ${CONFIG.tokenName}+`}
                </p>
                
                <div className="space-y-2">
                  {tier.perks.map((perk, perkIndex) => (
                    <div key={perkIndex} className="flex items-start gap-2">
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${tier.color} mt-2 flex-shrink-0`} />
                      <span className="text-xs text-gray-400">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EZT Rewards Section */}
      <section id="rewards" className="py-32 relative bg-[#141917]">
        <div className="absolute inset-0 art-deco-pattern opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">The Currency</p>
              <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
                <span className="text-white">What is </span>
                <span style={{ color: '#F7E733' }}>{CONFIG.tokenName}?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 font-light leading-relaxed">
                EZ Tokens are your key to the Elizian ecosystem. Like airline miles reimagined for the modern connoisseur, EZT rewards you for every luxury experience.
              </p>
              
              <div className="space-y-6">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#F7E733]/10 border border-[#F7E733]/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#F7E733]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display italic text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-500 font-light text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Token Card Preview */}
            <div className="relative">
              <div className="relative max-w-sm mx-auto">
                {/* Card */}
                <div className="relative rounded-3xl overflow-hidden membership-card p-8 glow-gold">
                  {/* Art Deco Pattern */}
                  <div className="absolute inset-0 art-deco-fan opacity-30" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F7E733] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-display italic text-xl" style={{ color: '#F7E733' }}>{CONFIG.brandName}</span>
                      </div>
                      <span className="text-xs text-gray-500 tracking-wider">LUMINAR</span>
                    </div>
                    
                    {/* Balance */}
                    <div className="mb-8">
                      <p className="text-xs text-gray-500 tracking-wider mb-1">TOKEN BALANCE</p>
                      <p className="text-4xl font-display italic" style={{ color: '#F7E733' }}>12,450 <span className="text-lg">{CONFIG.tokenName}</span></p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">This Month</p>
                        <p className="text-lg text-white font-light">+2,340 {CONFIG.tokenName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Multiplier</p>
                        <p className="text-lg text-[#F7E733] font-light">2x Active</p>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-xs text-gray-500">MEMBER SINCE</p>
                        <p className="text-sm text-white">JAN 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">MEMBER ID</p>
                        <p className="text-sm text-white font-mono">ELZ-009847</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F7E733]/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#F7E733]/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners CTA */}
      <section className="py-32 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141917]/98 via-[#141917]/90 to-[#141917]/80" />
        <div className="absolute inset-0 art-deco-fan opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Partnership</p>
          <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
            <span className="text-white">Join the </span>
            <span style={{ color: '#F7E733' }}>Elite Network</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
            Connect with discerning clientele seeking exceptional experiences. Elevate your establishment within the Elizian ecosystem.
          </p>
          <Button
            size="lg"
            className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-10 py-6 text-lg tracking-wide"
            onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
          >
            Access Partner Console
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#0f1311] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-display italic" style={{ color: '#F7E733' }}>{CONFIG.brandName}</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm font-light">{CONFIG.subTagline}</p>
              <div className="flex gap-4">
                <a href={CONFIG.socialLinks.twitter} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={CONFIG.socialLinks.instagram} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={CONFIG.socialLinks.discord} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
              </div>
            </div>

            {/* For Users */}
            <div>
              <h4 className="font-display italic text-white text-lg mb-6">For Members</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#services" className="hover:text-[#F7E733] transition-colors">Services</a></li>
                <li><a href="#membership" className="hover:text-[#F7E733] transition-colors">Membership Tiers</a></li>
                <li><a href="#rewards" className="hover:text-[#F7E733] transition-colors">{CONFIG.tokenName} Rewards</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* For Partners */}
            <div>
              <h4 className="font-display italic text-white text-lg mb-6">For Partners</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href={CONFIG.partnerConsoleUrl} className="hover:text-[#F7E733] transition-colors">Partner Console</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Success Stories</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display italic text-white text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs">
              Powered by blockchain technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

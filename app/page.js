'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
  CheckCircle,
  Coins,
  User
} from 'lucide-react'

// Icon mapping for dynamic rendering
const ICON_MAP = {
  Utensils, CalendarDays, Heart, Sparkle, Plane, Gem, Crown, 
  CheckCircle, Coins, User, Gift, Wallet, Star, Shield, Zap, Globe, Users, TrendingUp
}

// Fallback config if API fails
const FALLBACK_CONFIG = {
  brand: {
    name: 'Elizian',
    tagline: 'Experience Luxury.',
    taglineAccent: 'Own Prestige.',
    subTagline: 'Your gateway to lifestyle rewards, powered by blockchain.',
    tokenName: 'EZT',
    tokenFullName: 'EZ Tokens'
  },
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80',
    headline: 'The way to experience',
    headlineAccent: 'Luxury'
  },
  social_links: {
    twitter: '#',
    instagram: '#',
    discord: '#'
  },
  app_links: {
    ios: '#',
    android: '#'
  },
  partner_console: {
    url: '/partner'
  },
  footer: {
    copyrightText: '© 2025 Elizian. All rights reserved.',
    tagline: 'Powered by blockchain technology'
  }
}

// Features (static for now)
const FEATURES = [
  { icon: Shield, title: 'Blockchain Secured', description: 'Your rewards are immutably protected by cutting-edge distributed ledger technology.' },
  { icon: Zap, title: 'Instant Recognition', description: 'Earn EZT tokens the moment your transaction completes. No waiting, no hassle.' },
  { icon: Users, title: 'Curated Network', description: "Access an invitation-only collection of the world's most prestigious service providers." },
  { icon: TrendingUp, title: 'Appreciating Value', description: 'Your tokens grow in utility as our exclusive ecosystem expands globally.' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Discover', description: "Explore our curated collection of the world's finest luxury services.", icon: Globe },
  { step: '02', title: 'Experience', description: 'Indulge in exceptional moments crafted by our distinguished partners.', icon: Star },
  { step: '03', title: 'Earn', description: 'Receive EZT tokens with every booking, secured on the blockchain.', icon: Wallet },
  { step: '04', title: 'Ascend', description: 'Unlock increasingly exclusive tiers and unparalleled privileges.', icon: Crown },
]

export default function ElizianLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [settings, setSettings] = useState(FALLBACK_CONFIG)
  const [tiers, setTiers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch settings
        const settingsRes = await fetch('/api/settings')
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setSettings({ ...FALLBACK_CONFIG, ...data })
        }

        // Fetch tiers
        const tiersRes = await fetch('/api/tiers')
        if (tiersRes.ok) {
          const tiersData = await tiersRes.json()
          setTiers(tiersData)
        }

        // Fetch categories
        const categoriesRes = await fetch('/api/categories')
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        }
      } catch (error) {
        console.log('Using fallback config:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const brand = settings.brand || FALLBACK_CONFIG.brand
  const hero = settings.hero || FALLBACK_CONFIG.hero
  const socialLinks = settings.social_links || FALLBACK_CONFIG.social_links
  const appLinks = settings.app_links || FALLBACK_CONFIG.app_links
  const partnerConsole = settings.partner_console || FALLBACK_CONFIG.partner_console
  const footer = settings.footer || FALLBACK_CONFIG.footer

  // Get icon component by name
  const getIcon = (iconName) => ICON_MAP[iconName] || Sparkle

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
              <span className="text-2xl font-display font-semibold tracking-wide" style={{ color: '#F7E733' }}>
                {brand.name}
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
                onClick={() => window.location.href = partnerConsole.url}
              >
                Become a Partner
              </Button>
              <Button
                className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-6"
                onClick={() => window.location.href = appLinks.ios || '#download'}
              >
                Download App
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                <Button variant="outline" className="w-full border-[#F7E733]/50 text-[#F7E733] hover:bg-[#F7E733]/10 rounded-full" onClick={() => window.location.href = partnerConsole.url}>
                  Become a Partner
                </Button>
                <Button className="w-full bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full" onClick={() => window.location.href = appLinks.ios || '#download'}>
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${hero.backgroundImage}')` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 art-deco-fan opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="mb-8">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/90 mb-4 tracking-wide">
              {hero.headline}
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic tracking-wide" style={{ color: '#F7E733' }}>
              {hero.headlineAccent}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#F7E733]/80 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            {brand.subTagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-normal tracking-wide"
              onClick={() => window.location.href = partnerConsole.url}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Become a Partner
            </Button>
            <Button
              size="lg"
              className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-8 py-6 text-base tracking-wide"
              onClick={() => window.location.href = appLinks.ios || '#download'}
            >
              <Download className="w-4 h-4 mr-2" />
              Download the App
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#F7E733]/50" />
        </div>
      </section>

      {/* How It Works */}
      <section id="experience" className="py-32 relative bg-[#141917]">
        <div className="absolute inset-0 art-deco-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">The Journey</p>
            <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span className="text-white">How </span>
              <span style={{ color: '#F7E733' }}>{brand.name}</span>
              <span className="text-white"> Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="relative group text-center">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F7E733]/10 to-transparent border border-[#F7E733]/20 flex items-center justify-center group-hover:border-[#F7E733]/40 transition-all duration-500">
                    <item.icon className="w-10 h-10 text-[#F7E733]" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-mono text-[#F7E733]/50">{item.step}</span>
                </div>
                <h3 className="text-2xl font-display italic text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = getIcon(category.icon_name)
              return (
                <div key={category.id || index} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${category.image_url}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-5 h-5 text-[#F7E733]" />
                      <span className="text-[#F7E733] text-xs tracking-[0.2em] uppercase">{category.description}</span>
                    </div>
                    <h3 className="text-2xl font-display italic text-white">{category.name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Tiers - Blackbird Style */}
      <section id="membership" className="py-32 relative bg-[#0f1311]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Membership</p>
            <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span className="text-white">Rewards for </span>
              <span style={{ color: '#F7E733' }}>what you love</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              The best customers deserve the best rewards. Ascend through our exclusive tiers.
            </p>
          </div>

          {/* Blackbird-style Tier Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tiers.map((tier, index) => {
              const isDark = tier.text_color === 'light'
              const bgStyle = { backgroundColor: tier.bg_color || '#FFFFFF' }
              
              return (
                <div
                  key={tier.id || index}
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={bgStyle}
                >
                  {/* Header with multiplier badge */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-6">
                      {/* Tier Icon */}
                      {tier.icon_url && (
                        <img src={tier.icon_url} alt={tier.name} className="w-12 h-12 object-contain" />
                      )}
                      {/* Multiplier Badge */}
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isDark ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
                      }`}>
                        {tier.multiplier}
                      </div>
                    </div>

                    {/* Tier Headline */}
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {tier.headline || tier.name}
                    </h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                      {tier.description}
                    </p>

                    {/* Qualification Buttons */}
                    {tier.min_spend > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'border border-white/30 text-white' : 'bg-black text-white'
                        }`}>
                          SPEND ${tier.min_spend?.toLocaleString()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'border border-white/30 text-white' : 'bg-black text-white'
                        }`}>
                          {tier.min_visits} VISITS
                        </span>
                      </div>
                    )}

                    {/* Instant Upgrade */}
                    {tier.instant_upgrade_amount > 0 && (
                      <p className={`text-xs uppercase tracking-wide mb-4 ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                        Or upgrade instantly with a ${tier.instant_upgrade_amount?.toLocaleString()} deposit to ${brand.tokenName}
                      </p>
                    )}

                    {/* Download Button (only for first tier) */}
                    {index === 0 && (
                      <Button
                        className="w-full bg-[#FFF9CC] hover:bg-[#FFEDA0] text-black font-medium rounded-full text-sm"
                        onClick={() => window.location.href = appLinks.ios || '#download'}
                      >
                        Download the App
                      </Button>
                    )}
                  </div>

                  {/* Benefits Section */}
                  <div className={`px-6 pb-6 ${isDark ? '' : ''}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                      Rewards
                    </p>
                    <div className="space-y-3">
                      {tier.benefits?.map((benefit, bIndex) => {
                        const BenefitIcon = getIcon(benefit.icon_name)
                        return (
                          <div
                            key={benefit.id || bIndex}
                            className={`p-3 rounded-xl ${
                              isDark ? 'bg-white/10' : 'bg-black/5'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <BenefitIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
                              <div>
                                <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                                  {benefit.title}
                                </p>
                                <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
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
                <span style={{ color: '#F7E733' }}>${brand.tokenName}?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 font-light leading-relaxed">
                {brand.tokenFullName} are your key to the {brand.name} ecosystem. Like airline miles reimagined for the modern connoisseur, {brand.tokenName} rewards you for every luxury experience.
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

            {/* Token Card */}
            <div className="relative">
              <div className="relative max-w-sm mx-auto">
                <div className="relative rounded-3xl overflow-hidden membership-card p-8 glow-gold">
                  <div className="absolute inset-0 art-deco-fan opacity-30" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F7E733] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-display italic text-xl" style={{ color: '#F7E733' }}>{brand.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 tracking-wider">LUMINAR</span>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-xs text-gray-500 tracking-wider mb-1">TOKEN BALANCE</p>
                      <p className="text-4xl font-display italic" style={{ color: '#F7E733' }}>12,450 <span className="text-lg">{brand.tokenName}</span></p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">This Month</p>
                        <p className="text-lg text-white font-light">+2,340 {brand.tokenName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Multiplier</p>
                        <p className="text-lg text-[#F7E733] font-light">2x Active</p>
                      </div>
                    </div>
                    
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141917]/98 via-[#141917]/90 to-[#141917]/80" />
        <div className="absolute inset-0 art-deco-fan opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Partnership</p>
          <h2 className="text-4xl sm:text-5xl font-display italic mb-6">
            <span className="text-white">Join the </span>
            <span style={{ color: '#F7E733' }}>Elite Network</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
            Connect with discerning clientele seeking exceptional experiences. Elevate your establishment within the {brand.name} ecosystem.
          </p>
          <Button
            size="lg"
            className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-10 py-6 text-lg tracking-wide"
            onClick={() => window.location.href = partnerConsole.url}
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
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-display italic" style={{ color: '#F7E733' }}>{brand.name}</span>
              </div>
              <p className="text-gray-600 mb-6 text-sm font-light">{brand.subTagline}</p>
              <div className="flex gap-4">
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
                {socialLinks.discord && (
                  <a href={socialLinks.discord} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#F7E733]/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-display italic text-white text-lg mb-6">For Members</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#services" className="hover:text-[#F7E733] transition-colors">Services</a></li>
                <li><a href="#membership" className="hover:text-[#F7E733] transition-colors">Membership Tiers</a></li>
                <li><a href="#rewards" className="hover:text-[#F7E733] transition-colors">{brand.tokenName} Rewards</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display italic text-white text-lg mb-6">For Partners</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href={partnerConsole.url} className="hover:text-[#F7E733] transition-colors">Partner Console</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-[#F7E733] transition-colors">Success Stories</a></li>
              </ul>
            </div>

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
            <p className="text-gray-600 text-sm">{footer.copyrightText}</p>
            <p className="text-gray-700 text-xs">{footer.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

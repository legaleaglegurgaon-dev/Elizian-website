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
  Play,
  CheckCircle2
} from 'lucide-react'

// ============ CUSTOMIZABLE CONFIG ============
const CONFIG = {
  // Brand
  brandName: 'Elizian',
  tagline: 'Experience Luxury. Own Prestige.',
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

// Service Categories
const CATEGORIES = [
  { name: 'Dining', icon: Utensils, description: 'Fine dining & restaurants', color: 'from-amber-500 to-orange-600' },
  { name: 'Events', icon: CalendarDays, description: 'Exclusive experiences', color: 'from-purple-500 to-pink-600' },
  { name: 'Healthcare', icon: Heart, description: 'Premium health services', color: 'from-red-500 to-rose-600' },
  { name: 'Spa & Salon', icon: Sparkle, description: 'Luxury wellness', color: 'from-teal-500 to-cyan-600' },
  { name: 'Wellness', icon: Gem, description: 'Mind & body care', color: 'from-green-500 to-emerald-600' },
  { name: 'Travel', icon: Plane, description: 'Luxury getaways', color: 'from-blue-500 to-indigo-600' },
]

// How it works steps
const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Discover & Book',
    description: 'Browse premium services across dining, events, healthcare, spa, wellness, and travel.',
    icon: Globe,
  },
  {
    step: '02',
    title: 'Experience Excellence',
    description: 'Enjoy world-class services from our curated network of luxury partners.',
    icon: Star,
  },
  {
    step: '03',
    title: 'Earn EZT Rewards',
    description: 'Every booking earns you EZ Tokens - our exclusive blockchain-powered rewards.',
    icon: Wallet,
  },
  {
    step: '04',
    title: 'Unlock Prestige',
    description: 'Redeem tokens for exclusive perks, upgrades, and VIP experiences.',
    icon: Gift,
  },
]

// Features
const FEATURES = [
  {
    icon: Shield,
    title: 'Blockchain Secured',
    description: 'Your rewards are protected by cutting-edge blockchain technology.',
  },
  {
    icon: Zap,
    title: 'Instant Rewards',
    description: 'Earn EZT tokens immediately after every qualifying transaction.',
  },
  {
    icon: Users,
    title: 'Exclusive Network',
    description: 'Access to a curated collection of premium service providers.',
  },
  {
    icon: TrendingUp,
    title: 'Growing Value',
    description: 'Your tokens appreciate as our ecosystem expands globally.',
  },
]

// Reward Tiers
const REWARD_TIERS = [
  { name: 'Explorer', minTokens: 0, multiplier: '1x', perks: ['Basic rewards', 'Partner access'] },
  { name: 'Connoisseur', minTokens: 1000, multiplier: '2x', perks: ['Priority booking', '2x EZT earnings', 'Exclusive events'] },
  { name: 'Elite', minTokens: 5000, multiplier: '3x', perks: ['VIP access', '3x EZT earnings', 'Concierge service', 'Private experiences'] },
  { name: 'Prestige', minTokens: 15000, multiplier: '5x', perks: ['Ultimate access', '5x EZT earnings', 'Personal curator', 'Bespoke experiences'] },
]

export default function ElizianLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-gradient-gold">{CONFIG.brandName}</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-amber-400 transition-colors">How It Works</a>
              <a href="#categories" className="text-gray-300 hover:text-amber-400 transition-colors">Services</a>
              <a href="#rewards" className="text-gray-300 hover:text-amber-400 transition-colors">{CONFIG.tokenName} Rewards</a>
              <a href="#features" className="text-gray-300 hover:text-amber-400 transition-colors">Features</a>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400"
                onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Partner Console
              </Button>
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                onClick={() => window.location.href = CONFIG.appDownloadUrl}
              >
                <Download className="w-4 h-4 mr-2" />
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
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/5">
            <div className="px-4 py-6 space-y-4">
              <a href="#how-it-works" className="block py-2 text-gray-300 hover:text-amber-400">How It Works</a>
              <a href="#categories" className="block py-2 text-gray-300 hover:text-amber-400">Services</a>
              <a href="#rewards" className="block py-2 text-gray-300 hover:text-amber-400">{CONFIG.tokenName} Rewards</a>
              <a href="#features" className="block py-2 text-gray-300 hover:text-amber-400">Features</a>
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                  onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Partner Console
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold"
                  onClick={() => window.location.href = CONFIG.appDownloadUrl}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px]" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Powered by Blockchain</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block text-white">{CONFIG.brandName}.</span>
            <span className="block text-gradient-gold mt-2">{CONFIG.tagline}</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            {CONFIG.subTagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              onClick={() => window.location.href = CONFIG.appDownloadUrl}
            >
              <Download className="w-5 h-5 mr-2" />
              Download the App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 text-lg px-8 py-6 rounded-xl"
              onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Become a Partner
            </Button>
          </div>

          {/* Token Preview Card */}
          <div className="max-w-md mx-auto">
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-amber-500/50 via-amber-400/50 to-amber-500/50">
              <div className="bg-[#0f0f0f] rounded-2xl p-6 glow-gold">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">{CONFIG.tokenName}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">{CONFIG.tokenFullName}</p>
                      <p className="text-sm text-gray-400">Lifestyle Rewards Currency</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gradient-gold">∞</p>
                    <p className="text-xs text-gray-500">Possibilities</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-400">Earn on every booking</span>
                  <span className="text-amber-400 font-medium">Up to 5x rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-500/50" />
        </div>
      </section>

      {/* Service Categories */}
      <section id="categories" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Premium </span>
              <span className="text-gradient-gold">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover and book from our curated collection of luxury experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, index) => (
              <Card
                key={index}
                className="group bg-[#111] border-white/5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} p-0.5 group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">How </span>
              <span className="text-gradient-gold">{CONFIG.brandName}</span>
              <span className="text-white"> Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your journey to luxury rewards in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
                )}
                
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 mb-6">
                    <item.icon className="w-10 h-10 text-amber-400" />
                  </div>
                  <div className="text-amber-500 font-mono text-sm mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Tiers */}
      <section id="rewards" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient-gold">{CONFIG.tokenName}</span>
              <span className="text-white"> Rewards</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Climb the tiers and unlock exclusive benefits with every booking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REWARD_TIERS.map((tier, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden bg-[#0f0f0f] border-white/5 hover:border-amber-500/30 transition-all duration-300 ${
                  index === 3 ? 'ring-2 ring-amber-500/50' : ''
                }`}
              >
                {index === 3 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                    ULTIMATE
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      index === 0 ? 'bg-gray-800' :
                      index === 1 ? 'bg-gradient-to-br from-amber-700 to-amber-900' :
                      index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-700' :
                      'bg-gradient-to-br from-amber-400 to-amber-600 animate-pulse-gold'
                    }`}>
                      <span className={`text-2xl font-bold ${
                        index >= 2 ? 'text-black' : 'text-white'
                      }`}>{tier.multiplier}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {tier.minTokens === 0 ? 'Start here' : `${tier.minTokens.toLocaleString()} ${CONFIG.tokenName}+`}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {tier.perks.map((perk, perkIndex) => (
                      <div key={perkIndex} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                          index === 3 ? 'text-amber-400' : 'text-gray-500'
                        }`} />
                        <span className="text-sm text-gray-300">{perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Token CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">Start earning {CONFIG.tokenName} today</h3>
                <p className="text-gray-400">Download the app and make your first booking</p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold"
                onClick={() => window.location.href = CONFIG.appDownloadUrl}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-white">Why Choose </span>
                <span className="text-gradient-gold">{CONFIG.brandName}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Experience the future of lifestyle rewards with blockchain-powered benefits that grow with you.
              </p>
              
              <div className="space-y-6">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-amber-500/50 via-amber-400/30 to-amber-600/50">
                <div className="bg-[#0a0a0a] rounded-3xl p-8 glow-gold-strong">
                  {/* Mock App Preview */}
                  <div className="aspect-[9/16] max-w-[280px] mx-auto bg-[#111] rounded-[32px] border-4 border-gray-800 overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
                    <div className="p-4 pt-8">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-bold text-gradient-gold">{CONFIG.brandName}</span>
                      </div>
                      
                      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Your Balance</p>
                        <p className="text-2xl font-bold text-gradient-gold">2,450 {CONFIG.tokenName}</p>
                        <p className="text-xs text-green-400 mt-1">↑ 150 this week</p>
                      </div>
                      
                      <div className="space-y-3">
                        {CATEGORIES.slice(0, 3).map((cat, i) => (
                          <div key={i} className="bg-[#1a1a1a] rounded-xl p-3 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                              <cat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{cat.name}</p>
                              <p className="text-xs text-gray-500">Explore →</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-600/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-amber-500/50 via-amber-400/50 to-amber-500/50">
            <div className="bg-[#0a0a0a] rounded-3xl p-12 text-center">
              <Building2 className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Become a Partner
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the {CONFIG.brandName} network and connect with high-value customers seeking premium experiences. Grow your business with blockchain-powered loyalty.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg px-8"
                onClick={() => window.location.href = CONFIG.partnerConsoleUrl}
              >
                Access Partner Console
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold text-gradient-gold">{CONFIG.brandName}</span>
              </div>
              <p className="text-gray-500 mb-4">{CONFIG.subTagline}</p>
              <div className="flex gap-4">
                <a href={CONFIG.socialLinks.twitter} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href={CONFIG.socialLinks.instagram} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={CONFIG.socialLinks.discord} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
              </div>
            </div>

            {/* For Users */}
            <div>
              <h4 className="font-semibold text-white mb-4">For Users</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#categories" className="hover:text-amber-400 transition-colors">Browse Services</a></li>
                <li><a href="#rewards" className="hover:text-amber-400 transition-colors">{CONFIG.tokenName} Rewards</a></li>
                <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* For Partners */}
            <div>
              <h4 className="font-semibold text-white mb-4">For Partners</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href={CONFIG.partnerConsoleUrl} className="hover:text-amber-400 transition-colors">Partner Console</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Integration Guide</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Partner Benefits</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Success Stories</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm">
              Powered by blockchain technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

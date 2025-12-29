'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sparkles,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Users,
  TrendingUp,
  Gift,
  Shield,
  Send,
  Loader2,
  Star,
  Globe,
  Award
} from 'lucide-react'

const CATEGORIES = [
  'Fine Dining',
  'Exclusive Events',
  'Premium Healthcare',
  'Luxury Spa',
  'Elite Wellness',
  'Private Travel',
]

const PARTNER_BENEFITS = [
  {
    icon: Users,
    title: 'Access Discerning Clientele',
    description: 'Connect with high-net-worth individuals actively seeking exceptional luxury experiences.'
  },
  {
    icon: TrendingUp,
    title: 'Elevate Your Brand',
    description: 'Position your establishment among the world\'s most prestigious service providers.'
  },
  {
    icon: Gift,
    title: 'EZT Integration',
    description: 'Leverage our blockchain-powered rewards to build lasting customer relationships.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Join an exclusive network spanning six continents of luxury excellence.'
  },
]

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    category: '',
    website: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Failed to submit. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#141917] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-display italic mb-4">Application Received</h1>
          <p className="text-gray-400 mb-8 font-light">
            Thank you for your interest in joining the Elizian network. Our partnership team will review your application and contact you within 2-3 business days.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium rounded-full px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141917] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 art-deco-fan opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F7E733]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F7E733]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-display italic" style={{ color: '#F7E733' }}>Elizian</span>
            </a>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="text-gray-400 hover:text-white rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <p className="text-[#F7E733] text-sm tracking-[0.3em] uppercase mb-4">Partnership</p>
            <h1 className="text-4xl sm:text-5xl font-display italic mb-6">
              <span className="text-white">Join the </span>
              <span style={{ color: '#F7E733' }}>Elite Network</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Partner with Elizian and connect with the world's most discerning clientele seeking exceptional experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-display italic text-white mb-8">Partner Benefits</h2>
              <div className="space-y-6">
                {PARTNER_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#F7E733]/10 border border-[#F7E733]/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-[#F7E733]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display italic text-white mb-1">{benefit.title}</h3>
                      <p className="text-gray-500 font-light text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-[#1a1f1c] border border-white/5">
                <h3 className="font-display italic text-white text-lg mb-2">Already a partner?</h3>
                <p className="text-gray-500 mb-4 text-sm font-light">Access your dashboard to manage bookings, view analytics, and more.</p>
                <Button
                  variant="outline"
                  className="border-[#F7E733]/30 text-[#F7E733] hover:bg-[#F7E733]/10 rounded-full"
                >
                  Sign In
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#1a1f1c] border border-white/5 rounded-2xl p-8">
              <h2 className="text-2xl font-display italic text-white mb-8">Partner Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-gray-400 text-sm">Establishment Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl"
                      placeholder="Your establishment"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-gray-400 text-sm">Contact Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-400 text-sm">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-400 text-sm">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-400 text-sm">Category *</Label>
                    <Select onValueChange={handleCategoryChange} required>
                      <SelectTrigger className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1f1c] border-white/10">
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-white hover:bg-[#F7E733]/10 focus:bg-[#F7E733]/10">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-gray-400 text-sm">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="bg-[#141917] border-white/10 text-white focus:border-[#F7E733] rounded-xl"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-400 text-sm">Tell us about your establishment</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#141917] border border-white/10 text-white focus:border-[#F7E733] focus:outline-none focus:ring-1 focus:ring-[#F7E733] resize-none font-light"
                    placeholder="Describe your services, clientele, and why you'd like to partner with Elizian..."
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium text-lg py-6 rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-600">
                  By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

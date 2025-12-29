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
  Loader2
} from 'lucide-react'

const CATEGORIES = [
  'Dining',
  'Events',
  'Healthcare',
  'Spa & Salon',
  'Wellness',
  'Travel',
]

const PARTNER_BENEFITS = [
  {
    icon: Users,
    title: 'Access Premium Customers',
    description: 'Connect with high-value customers actively seeking luxury experiences.'
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Business',
    description: 'Increase bookings and revenue through our engaged user base.'
  },
  {
    icon: Gift,
    title: 'Loyalty Program',
    description: 'Leverage our EZT token rewards to build customer loyalty.'
  },
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Secure, transparent transactions powered by blockchain technology.'
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
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your interest in partnering with Elizian. Our team will review your application and get back to you within 2-3 business days.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Elizian</span>
            </a>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Partner Console</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Grow with </span>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Elizian</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join our network of premium service providers and connect with customers seeking exceptional experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Partner Benefits</h2>
              <div className="space-y-6">
                {PARTNER_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20">
                <h3 className="text-lg font-semibold text-white mb-2">Already a partner?</h3>
                <p className="text-gray-400 mb-4">Access your dashboard to manage bookings, view analytics, and more.</p>
                <Button
                  variant="outline"
                  className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                >
                  Sign In to Dashboard
                </Button>
              </div>
            </div>

            {/* Form */}
            <Card className="bg-[#111] border-white/5">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Partner Application</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-gray-300">Business Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500"
                        placeholder="Your business name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-gray-300">Contact Name *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">Category *</Label>
                      <Select onValueChange={handleCategoryChange} required>
                        <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#111] border-white/10">
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat} className="text-white hover:bg-amber-500/10">
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-gray-300">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        className="bg-[#0a0a0a] border-white/10 text-white focus:border-amber-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Tell us about your business</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 rounded-md bg-[#0a0a0a] border border-white/10 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                      placeholder="Describe your services, target customers, and why you'd like to partner with Elizian..."
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6"
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

                  <p className="text-center text-sm text-gray-500">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

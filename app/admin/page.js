'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sparkles,
  Settings,
  Layers,
  Grid3X3,
  FileText,
  Image,
  Save,
  Plus,
  Trash2,
  Edit,
  ChevronUp,
  ChevronDown,
  Eye,
  ExternalLink,
  Loader2,
  Check,
  X,
  RefreshCw,
  Home,
  Lock
} from 'lucide-react'

const ICON_OPTIONS = [
  'Utensils', 'CalendarDays', 'Heart', 'Sparkle', 'Plane', 'Gem', 'Crown',
  'CheckCircle', 'Coins', 'User', 'Gift', 'Wallet', 'Star', 'Shield', 'Zap', 'Globe', 'Users', 'TrendingUp'
]

const PAGE_TYPES = [
  { value: 'blog', label: 'Blog Post' },
  { value: 'terms', label: 'Terms & Conditions' },
  { value: 'privacy', label: 'Privacy Policy' },
  { value: 'success_story', label: 'Success Story' },
  { value: 'customer_story', label: 'Customer Story' },
  { value: 'media', label: 'Media/Press' },
  { value: 'faq', label: 'FAQ' },
  { value: 'about', label: 'About Page' },
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  
  const [activeTab, setActiveTab] = useState('brand')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Data states
  const [settings, setSettings] = useState({})
  const [tiers, setTiers] = useState([])
  const [categories, setCategories] = useState([])
  const [pages, setPages] = useState([])
  
  // Edit states
  const [editingTier, setEditingTier] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingPage, setEditingPage] = useState(null)
  const [editingBenefit, setEditingBenefit] = useState(null)

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('elizian_admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData()
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    // Simple password check (in production, use proper auth)
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'elizian_admin_2025'
    if (password === adminPassword || password === 'elizian_admin_2025') {
      sessionStorage.setItem('elizian_admin_auth', 'true')
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid password')
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [settingsRes, tiersRes, categoriesRes, pagesRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/admin/tiers'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/pages')
      ])
      
      if (settingsRes.ok) setSettings(await settingsRes.json())
      if (tiersRes.ok) setTiers(await tiersRes.json())
      if (categoriesRes.ok) setCategories(await categoriesRes.json())
      if (pagesRes.ok) setPages(await pagesRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
      showMessage('error', 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  // ==================== SETTINGS ====================
  const updateSetting = async (key, value) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/settings/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      })
      if (res.ok) {
        setSettings(prev => ({ ...prev, [key]: value }))
        showMessage('success', 'Settings saved!')
      }
    } catch (error) {
      showMessage('error', 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  // ==================== TIERS ====================
  const saveTier = async (tier) => {
    setSaving(true)
    try {
      const method = tier.id ? 'PUT' : 'POST'
      const url = tier.id ? `/api/admin/tiers/${tier.id}` : '/api/admin/tiers'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tier)
      })
      
      if (res.ok) {
        await fetchAllData()
        setEditingTier(null)
        showMessage('success', 'Tier saved!')
      }
    } catch (error) {
      showMessage('error', 'Failed to save tier')
    } finally {
      setSaving(false)
    }
  }

  const deleteTier = async (id) => {
    if (!confirm('Are you sure you want to delete this tier?')) return
    
    try {
      const res = await fetch(`/api/admin/tiers/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchAllData()
        showMessage('success', 'Tier deleted!')
      }
    } catch (error) {
      showMessage('error', 'Failed to delete tier')
    }
  }

  // ==================== BENEFITS ====================
  const saveBenefit = async (benefit, tierId) => {
    setSaving(true)
    try {
      const method = benefit.id ? 'PUT' : 'POST'
      const url = benefit.id ? `/api/admin/benefits/${benefit.id}` : `/api/admin/tiers/${tierId}/benefits`
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(benefit)
      })
      
      if (res.ok) {
        await fetchAllData()
        setEditingBenefit(null)
        showMessage('success', 'Benefit saved!')
      }
    } catch (error) {
      showMessage('error', 'Failed to save benefit')
    } finally {
      setSaving(false)
    }
  }

  const deleteBenefit = async (id) => {
    if (!confirm('Delete this benefit?')) return
    
    try {
      const res = await fetch(`/api/admin/benefits/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchAllData()
        showMessage('success', 'Benefit deleted!')
      }
    } catch (error) {
      showMessage('error', 'Failed to delete benefit')
    }
  }

  // ==================== CATEGORIES ====================
  const saveCategory = async (category) => {
    setSaving(true)
    try {
      const method = category.id ? 'PUT' : 'POST'
      const url = category.id ? `/api/admin/categories/${category.id}` : '/api/admin/categories'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      })
      
      if (res.ok) {
        await fetchAllData()
        setEditingCategory(null)
        showMessage('success', 'Category saved!')
      }
    } catch (error) {
      showMessage('error', 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category?')) return
    
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchAllData()
        showMessage('success', 'Category deleted!')
      }
    } catch (error) {
      showMessage('error', 'Failed to delete category')
    }
  }

  // ==================== PAGES ====================
  const savePage = async (page) => {
    setSaving(true)
    try {
      const method = page.id ? 'PUT' : 'POST'
      const url = page.id ? `/api/admin/pages/${page.id}` : '/api/admin/pages'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
      })
      
      if (res.ok) {
        await fetchAllData()
        setEditingPage(null)
        showMessage('success', 'Page saved!')
      }
    } catch (error) {
      showMessage('error', 'Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  const deletePage = async (id) => {
    if (!confirm('Delete this page?')) return
    
    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchAllData()
        showMessage('success', 'Page deleted!')
      }
    } catch (error) {
      showMessage('error', 'Failed to delete page')
    }
  }

  // ==================== LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#141917] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#1a1f1c] border-white/10">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-white font-display italic">Admin Access</CardTitle>
            <CardDescription className="text-gray-500">Enter password to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="bg-[#141917] border-white/10 text-white"
                />
                {authError && <p className="text-red-400 text-sm mt-2">{authError}</p>}
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-[#F7E733] hover:bg-[#e5d62f] text-black font-medium"
              >
                Login
              </Button>
              <p className="text-center text-gray-600 text-xs">
                Default password: elizian_admin_2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ==================== MAIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-[#141917] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1311]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-display italic" style={{ color: '#F7E733' }}>Elizian Admin</h1>
              <p className="text-xs text-gray-500">Content Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={fetchAllData} className="text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
              <a href="/" target="_blank">
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {message.type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#F7E733]" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-[#1a1f1c] border border-white/10 mb-8">
              <TabsTrigger value="brand" className="data-[state=active]:bg-[#F7E733] data-[state=active]:text-black">
                <Settings className="w-4 h-4 mr-2" />
                Brand & Settings
              </TabsTrigger>
              <TabsTrigger value="tiers" className="data-[state=active]:bg-[#F7E733] data-[state=active]:text-black">
                <Layers className="w-4 h-4 mr-2" />
                Membership Tiers
              </TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-[#F7E733] data-[state=active]:text-black">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="pages" className="data-[state=active]:bg-[#F7E733] data-[state=active]:text-black">
                <FileText className="w-4 h-4 mr-2" />
                Pages
              </TabsTrigger>
            </TabsList>

            {/* ==================== BRAND & SETTINGS TAB ==================== */}
            <TabsContent value="brand" className="space-y-6">
              {/* Brand Settings */}
              <Card className="bg-[#1a1f1c] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Brand Settings</CardTitle>
                  <CardDescription>Configure your brand identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Brand Name</Label>
                      <Input
                        value={settings.brand?.name || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, name: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Logo URL</Label>
                      <Input
                        value={settings.brand?.logoUrl || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, logoUrl: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Tagline</Label>
                      <Input
                        value={settings.brand?.tagline || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, tagline: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Tagline Accent</Label>
                      <Input
                        value={settings.brand?.taglineAccent || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, taglineAccent: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-gray-400">Sub Tagline</Label>
                      <Input
                        value={settings.brand?.subTagline || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, subTagline: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Token Name</Label>
                      <Input
                        value={settings.brand?.tokenName || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, tokenName: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Token Full Name</Label>
                      <Input
                        value={settings.brand?.tokenFullName || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, brand: { ...prev.brand, tokenFullName: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={() => updateSetting('brand', settings.brand)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Brand Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-[#1a1f1c] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {['twitter', 'instagram', 'discord', 'linkedin', 'youtube', 'tiktok'].map((platform) => (
                      <div key={platform}>
                        <Label className="text-gray-400 capitalize">{platform}</Label>
                        <Input
                          value={settings.social_links?.[platform] || ''}
                          onChange={(e) => setSettings(prev => ({ ...prev, social_links: { ...prev.social_links, [platform]: e.target.value } }))}
                          className="bg-[#141917] border-white/10 text-white mt-1"
                          placeholder={`https://${platform}.com/...`}
                        />
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => updateSetting('social_links', settings.social_links)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                    <Save className="w-4 h-4 mr-2" />
                    Save Social Links
                  </Button>
                </CardContent>
              </Card>

              {/* App Links */}
              <Card className="bg-[#1a1f1c] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">App Download Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">iOS App Store</Label>
                      <Input
                        value={settings.app_links?.ios || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, app_links: { ...prev.app_links, ios: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                        placeholder="https://apps.apple.com/..."
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Google Play Store</Label>
                      <Input
                        value={settings.app_links?.android || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, app_links: { ...prev.app_links, android: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                        placeholder="https://play.google.com/..."
                      />
                    </div>
                  </div>
                  <Button onClick={() => updateSetting('app_links', settings.app_links)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                    <Save className="w-4 h-4 mr-2" />
                    Save App Links
                  </Button>
                </CardContent>
              </Card>

              {/* Hero Section */}
              <Card className="bg-[#1a1f1c] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label className="text-gray-400">Background Image URL</Label>
                      <Input
                        value={settings.hero?.backgroundImage || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, hero: { ...prev.hero, backgroundImage: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Headline</Label>
                      <Input
                        value={settings.hero?.headline || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, hero: { ...prev.hero, headline: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Headline Accent (Gold text)</Label>
                      <Input
                        value={settings.hero?.headlineAccent || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, hero: { ...prev.hero, headlineAccent: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={() => updateSetting('hero', settings.hero)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                    <Save className="w-4 h-4 mr-2" />
                    Save Hero Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Footer */}
              <Card className="bg-[#1a1f1c] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Footer Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Copyright Text</Label>
                      <Input
                        value={settings.footer?.copyrightText || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, footer: { ...prev.footer, copyrightText: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Footer Tagline</Label>
                      <Input
                        value={settings.footer?.tagline || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, footer: { ...prev.footer, tagline: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Contact Email</Label>
                      <Input
                        value={settings.footer?.contactEmail || ''}
                        onChange={(e) => setSettings(prev => ({ ...prev, footer: { ...prev.footer, contactEmail: e.target.value } }))}
                        className="bg-[#141917] border-white/10 text-white mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={() => updateSetting('footer', settings.footer)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                    <Save className="w-4 h-4 mr-2" />
                    Save Footer Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ==================== MEMBERSHIP TIERS TAB ==================== */}
            <TabsContent value="tiers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display italic text-white">Membership Tiers</h2>
                <Button onClick={() => setEditingTier({ name: '', multiplier: '1x', bg_color: '#FFFFFF', text_color: 'dark' })} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tier
                </Button>
              </div>

              <div className="space-y-4">
                {tiers.map((tier, index) => (
                  <Card key={tier.id} className="bg-[#1a1f1c] border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          {tier.icon_url && <img src={tier.icon_url} alt={tier.name} className="w-12 h-12 object-contain" />}
                          <div>
                            <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                            <p className="text-gray-500 text-sm">{tier.subtitle} • {tier.multiplier}</p>
                            <p className="text-gray-600 text-xs mt-1">{tier.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded" style={{ backgroundColor: tier.bg_color }} />
                          <Button variant="ghost" size="sm" onClick={() => setEditingTier(tier)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteTier(tier.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-400">Benefits</h4>
                          <Button variant="ghost" size="sm" onClick={() => setEditingBenefit({ tier_id: tier.id, title: '', description: '', icon_name: 'Star' })} className="text-[#F7E733]">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Benefit
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {tier.benefits?.map((benefit) => (
                            <div key={benefit.id} className="flex items-center justify-between bg-[#141917] p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-[#F7E733]">{benefit.icon_name}</span>
                                <div>
                                  <p className="text-sm text-white">{benefit.title}</p>
                                  <p className="text-xs text-gray-500">{benefit.description}</p>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => setEditingBenefit({ ...benefit, tier_id: tier.id })}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteBenefit(benefit.id)} className="text-red-400">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ==================== CATEGORIES TAB ==================== */}
            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display italic text-white">Service Categories</h2>
                <Button onClick={() => setEditingCategory({ name: '', description: '', icon_name: 'Star', image_url: '' })} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="bg-[#1a1f1c] border-white/10 overflow-hidden">
                    {category.image_url && (
                      <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('${category.image_url}')` }} />
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.description}</p>
                          <p className="text-xs text-[#F7E733] mt-1">Icon: {category.icon_name}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteCategory(category.id)} className="text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ==================== PAGES TAB ==================== */}
            <TabsContent value="pages" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display italic text-white">Content Pages</h2>
                <Button onClick={() => setEditingPage({ title: '', content: '', page_type: 'blog', is_published: false })} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </div>

              <div className="space-y-4">
                {pages.map((page) => (
                  <Card key={page.id} className="bg-[#1a1f1c] border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`px-2 py-1 rounded text-xs ${page.is_published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {page.is_published ? 'Published' : 'Draft'}
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{page.title}</h3>
                            <p className="text-sm text-gray-500">/{page.slug} • {page.page_type}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingPage(page)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deletePage(page.id)} className="text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* ==================== TIER EDIT DIALOG ==================== */}
      <Dialog open={!!editingTier} onOpenChange={() => setEditingTier(null)}>
        <DialogContent className="bg-[#1a1f1c] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTier?.id ? 'Edit Tier' : 'Add New Tier'}</DialogTitle>
          </DialogHeader>
          {editingTier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Name</Label>
                  <Input value={editingTier.name} onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Subtitle</Label>
                  <Input value={editingTier.subtitle || ''} onChange={(e) => setEditingTier({ ...editingTier, subtitle: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Headline</Label>
                  <Input value={editingTier.headline || ''} onChange={(e) => setEditingTier({ ...editingTier, headline: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Multiplier</Label>
                  <Input value={editingTier.multiplier} onChange={(e) => setEditingTier({ ...editingTier, multiplier: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" placeholder="e.g., 2x" />
                </div>
                <div className="col-span-2">
                  <Label className="text-gray-400">Description</Label>
                  <Input value={editingTier.description || ''} onChange={(e) => setEditingTier({ ...editingTier, description: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Icon URL</Label>
                  <Input value={editingTier.icon_url || ''} onChange={(e) => setEditingTier({ ...editingTier, icon_url: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="color" value={editingTier.bg_color || '#FFFFFF'} onChange={(e) => setEditingTier({ ...editingTier, bg_color: e.target.value })} className="w-12 h-10 p-1 bg-[#141917] border-white/10" />
                    <Input value={editingTier.bg_color || ''} onChange={(e) => setEditingTier({ ...editingTier, bg_color: e.target.value })} className="bg-[#141917] border-white/10 text-white" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Text Color</Label>
                  <Select value={editingTier.text_color || 'dark'} onValueChange={(v) => setEditingTier({ ...editingTier, text_color: v })}>
                    <SelectTrigger className="bg-[#141917] border-white/10 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f1c] border-white/10">
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-400">Sort Order</Label>
                  <Input type="number" value={editingTier.sort_order || 0} onChange={(e) => setEditingTier({ ...editingTier, sort_order: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Min Spend ($)</Label>
                  <Input type="number" value={editingTier.min_spend || 0} onChange={(e) => setEditingTier({ ...editingTier, min_spend: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Min Visits</Label>
                  <Input type="number" value={editingTier.min_visits || 0} onChange={(e) => setEditingTier({ ...editingTier, min_visits: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Instant Upgrade Amount ($)</Label>
                  <Input type="number" value={editingTier.instant_upgrade_amount || 0} onChange={(e) => setEditingTier({ ...editingTier, instant_upgrade_amount: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingTier(null)} className="border-white/20">Cancel</Button>
                <Button onClick={() => saveTier(editingTier)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Tier'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== BENEFIT EDIT DIALOG ==================== */}
      <Dialog open={!!editingBenefit} onOpenChange={() => setEditingBenefit(null)}>
        <DialogContent className="bg-[#1a1f1c] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingBenefit?.id ? 'Edit Benefit' : 'Add New Benefit'}</DialogTitle>
          </DialogHeader>
          {editingBenefit && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Title</Label>
                <Input value={editingBenefit.title} onChange={(e) => setEditingBenefit({ ...editingBenefit, title: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Description</Label>
                <Input value={editingBenefit.description || ''} onChange={(e) => setEditingBenefit({ ...editingBenefit, description: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Icon</Label>
                <Select value={editingBenefit.icon_name || 'Star'} onValueChange={(v) => setEditingBenefit({ ...editingBenefit, icon_name: v })}>
                  <SelectTrigger className="bg-[#141917] border-white/10 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f1c] border-white/10">
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-400">Sort Order</Label>
                <Input type="number" value={editingBenefit.sort_order || 0} onChange={(e) => setEditingBenefit({ ...editingBenefit, sort_order: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingBenefit(null)} className="border-white/20">Cancel</Button>
                <Button onClick={() => saveBenefit(editingBenefit, editingBenefit.tier_id)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Benefit'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== CATEGORY EDIT DIALOG ==================== */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent className="bg-[#1a1f1c] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{editingCategory?.id ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400">Name</Label>
                <Input value={editingCategory.name} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Description</Label>
                <Input value={editingCategory.description || ''} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Image URL</Label>
                <Input value={editingCategory.image_url || ''} onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Icon</Label>
                <Select value={editingCategory.icon_name || 'Star'} onValueChange={(v) => setEditingCategory({ ...editingCategory, icon_name: v })}>
                  <SelectTrigger className="bg-[#141917] border-white/10 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f1c] border-white/10">
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-400">Sort Order</Label>
                <Input type="number" value={editingCategory.sort_order || 0} onChange={(e) => setEditingCategory({ ...editingCategory, sort_order: parseInt(e.target.value) })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingCategory(null)} className="border-white/20">Cancel</Button>
                <Button onClick={() => saveCategory(editingCategory)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Category'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== PAGE EDIT DIALOG ==================== */}
      <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
        <DialogContent className="bg-[#1a1f1c] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPage?.id ? 'Edit Page' : 'Add New Page'}</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Title</Label>
                  <Input value={editingPage.title} onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-gray-400">Page Type</Label>
                  <Select value={editingPage.page_type || 'blog'} onValueChange={(v) => setEditingPage({ ...editingPage, page_type: v })}>
                    <SelectTrigger className="bg-[#141917] border-white/10 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f1c] border-white/10">
                      {PAGE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-400">Slug (URL)</Label>
                <Input value={editingPage.slug || ''} onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" placeholder="auto-generated-from-title" />
              </div>
              <div>
                <Label className="text-gray-400">Featured Image URL</Label>
                <Input value={editingPage.featured_image || ''} onChange={(e) => setEditingPage({ ...editingPage, featured_image: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Meta Description</Label>
                <Input value={editingPage.meta_description || ''} onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })} className="bg-[#141917] border-white/10 text-white mt-1" />
              </div>
              <div>
                <Label className="text-gray-400">Content</Label>
                <textarea
                  value={editingPage.content || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  rows={10}
                  className="w-full mt-1 px-3 py-2 bg-[#141917] border border-white/10 rounded-md text-white resize-none focus:outline-none focus:border-[#F7E733]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={editingPage.is_published || false}
                  onChange={(e) => setEditingPage({ ...editingPage, is_published: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_published" className="text-gray-400">Published</Label>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingPage(null)} className="border-white/20">Cancel</Button>
                <Button onClick={() => savePage(editingPage)} disabled={saving} className="bg-[#F7E733] hover:bg-[#e5d62f] text-black">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Page'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

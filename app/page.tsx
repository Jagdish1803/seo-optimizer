"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Zap, Target, TrendingUp, Globe, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

interface Competitor {
  id: string
  title: string
  domain: string
  url: string
  description: string
  position: number
}

export default function HomePage() {
  const [keyword, setKeyword] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showCompetitorModal, setShowCompetitorModal] = useState(false)
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const mockCompetitors: Competitor[] = [
    {
      id: "1",
      title: "Best SEO Tools 2024 - Complete Guide",
      domain: "seoexpert.com",
      url: "https://seoexpert.com/tools-guide",
      description: "Comprehensive guide to the best SEO tools available in 2024",
      position: 1,
    },
    {
      id: "2",
      title: "Top 10 SEO Software Solutions",
      domain: "marketingpro.com",
      url: "https://marketingpro.com/seo-software",
      description: "Professional review of leading SEO software platforms",
      position: 2,
    },
    {
      id: "3",
      title: "SEO Tools Comparison & Reviews",
      domain: "digitalmarketing.org",
      url: "https://digitalmarketing.org/seo-comparison",
      description: "In-depth comparison of popular SEO tools and platforms",
      position: 3,
    },
    {
      id: "4",
      title: "Free vs Paid SEO Tools Analysis",
      domain: "seoinsights.net",
      url: "https://seoinsights.net/free-vs-paid",
      description: "Analysis of free and paid SEO tools effectiveness",
      position: 4,
    },
    {
      id: "5",
      title: "Enterprise SEO Tool Solutions",
      domain: "businessseo.co",
      url: "https://businessseo.co/enterprise-tools",
      description: "SEO tools designed for enterprise-level businesses",
      position: 5,
    },
  ]

  const handleStartAnalysis = async () => {
    if (!keyword.trim() || !websiteUrl.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both keyword and website URL",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate API call to fetch competitors
    setTimeout(() => {
      setCompetitors(mockCompetitors)
      setIsAnalyzing(false)
      setShowCompetitorModal(true)
    }, 2000)
  }

  const handleConfirmAnalysis = () => {
    if (selectedCompetitors.length === 0) {
      toast({
        title: "No Competitors Selected",
        description: "Please select at least one competitor to analyze",
        variant: "destructive",
      })
      return
    }

    // Store analysis data in localStorage
    const analysisData = {
      keyword,
      websiteUrl,
      competitors: competitors.filter((c) => selectedCompetitors.includes(c.id)),
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("currentAnalysis", JSON.stringify(analysisData))

    toast({
      title: "Analysis Started",
      description: "Redirecting to dashboard...",
    })

    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  const toggleCompetitor = (competitorId: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(competitorId) ? prev.filter((id) => id !== competitorId) : [...prev, competitorId],
    )
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">AI-Powered SEO Optimizer</span>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Analysis
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Boost Your Google Rankings with <span className="text-blue-600">AI-Powered SEO</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Smart audits, competitor insights, and actionable fixes — instantly. Get ahead of your competition with
                data-driven SEO optimization.
              </p>
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Target className="w-5 h-5 text-green-500" />
                <span>Competitor Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>AI Recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Globe className="w-5 h-5 text-purple-500" />
                <span>Technical SEO Audit</span>
              </div>
            </div>
          </motion.div>

          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Start Your SEO Analysis</CardTitle>
                <CardDescription>
                  Enter your target keyword and website URL to begin comprehensive SEO analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Keyword to Rank For</label>
                  <Input
                    placeholder="e.g., best SEO tools"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-xs text-slate-500">Enter the main keyword you want to rank for</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Your Website URL</label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="h-12 text-lg"
                  />
                  <p className="text-xs text-slate-500">The page you want to optimize for this keyword</p>
                </div>

                <Button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Search className="w-5 h-5 mr-2" />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto"
          >
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comprehensive Audit</h3>
              <p className="text-slate-600">
                Deep analysis of your website's SEO performance across all critical factors
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Competitor Insights</h3>
              <p className="text-slate-600">Compare your performance against top-ranking competitors in your niche</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Recommendations</h3>
              <p className="text-slate-600">Get actionable, AI-powered suggestions to improve your rankings</p>
            </Card>
          </motion.div>
        </div>

        {/* Competitor Selection Modal */}
        <Dialog open={showCompetitorModal} onOpenChange={setShowCompetitorModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Select Competitors to Analyze</DialogTitle>
              <DialogDescription>
                We found the top 5 competitors for "{keyword}". Select which ones you'd like to compare against.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-6">
              {competitors.map((competitor) => (
                <motion.div
                  key={competitor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Number.parseInt(competitor.id) * 0.1 }}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    id={competitor.id}
                    checked={selectedCompetitors.includes(competitor.id)}
                    onCheckedChange={() => toggleCompetitor(competitor.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{competitor.position}</Badge>
                      <span className="font-medium text-blue-600">{competitor.domain}</span>
                    </div>
                    <h4 className="font-semibold text-slate-900">{competitor.title}</h4>
                    <p className="text-sm text-slate-600">{competitor.description}</p>
                    <p className="text-xs text-slate-500">{competitor.url}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <p className="text-sm text-slate-600">
                {selectedCompetitors.length} competitor{selectedCompetitors.length !== 1 ? "s" : ""} selected
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowCompetitorModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmAnalysis} className="bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm & Analyze
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </>
  )
}

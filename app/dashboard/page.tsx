"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Download,
  Copy,
  Lightbulb,
  Smartphone,
  Gauge,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"

interface AnalysisData {
  keyword: string
  websiteUrl: string
  competitors: Array<{
    id: string
    title: string
    domain: string
    url: string
  }>
  timestamp: string
}

interface SEOMetric {
  name: string
  score: number
  status: "pass" | "warning" | "fail"
  description: string
  recommendation?: string
}

export default function DashboardPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [hidePassedItems, setHidePassedItems] = useState(false)
  const [showCriticalFirst, setShowCriticalFirst] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const data = localStorage.getItem("currentAnalysis")
    if (data) {
      setAnalysisData(JSON.parse(data))
    }
  }, [])

  const seoMetrics: SEOMetric[] = [
    {
      name: "Page Title",
      score: 85,
      status: "pass",
      description: "Title tag is optimized and includes target keyword",
      recommendation: "Consider adding year or location for better specificity",
    },
    {
      name: "Meta Description",
      score: 60,
      status: "warning",
      description: "Meta description exists but could be more compelling",
      recommendation: "Add a clear call-to-action and emotional trigger words",
    },
    {
      name: "H1 Tag",
      score: 90,
      status: "pass",
      description: "Single H1 tag present with target keyword",
    },
    {
      name: "Content Length",
      score: 45,
      status: "fail",
      description: "Content is too short compared to competitors",
      recommendation: "Expand content to at least 1,500 words for better ranking potential",
    },
    {
      name: "Internal Links",
      score: 70,
      status: "warning",
      description: "Good internal linking structure but could be improved",
      recommendation: "Add 3-5 more relevant internal links to related pages",
    },
    {
      name: "Schema Markup",
      score: 30,
      status: "fail",
      description: "Missing structured data markup",
      recommendation: "Implement Article, FAQ, and Organization schema markup",
    },
    {
      name: "Page Speed",
      score: 75,
      status: "warning",
      description: "Good loading speed but room for improvement",
      recommendation: "Optimize images and enable browser caching",
    },
    {
      name: "Mobile Friendliness",
      score: 95,
      status: "pass",
      description: "Excellent mobile optimization",
    },
  ]

  const competitorData = [
    { name: "Your Site", score: 68, contentLength: 800, backlinks: 45, keywords: 120 },
    { name: "Competitor 1", score: 85, contentLength: 2100, backlinks: 180, keywords: 340 },
    { name: "Competitor 2", score: 78, contentLength: 1800, backlinks: 120, keywords: 280 },
    { name: "Competitor 3", score: 72, contentLength: 1500, backlinks: 90, keywords: 200 },
  ]

  const radarData = [
    { subject: "Content Quality", yourSite: 65, competitor1: 85, competitor2: 78 },
    { subject: "Technical SEO", yourSite: 70, competitor1: 80, competitor2: 75 },
    { subject: "Backlinks", yourSite: 45, competitor1: 90, competitor2: 70 },
    { subject: "User Experience", yourSite: 85, competitor1: 75, competitor2: 80 },
    { subject: "Mobile Optimization", yourSite: 95, competitor1: 85, competitor2: 90 },
    { subject: "Page Speed", yourSite: 75, competitor1: 70, competitor2: 85 },
  ]

  const performanceData = [
    { metric: "First Contentful Paint", score: 2.1, status: "good" },
    { metric: "Largest Contentful Paint", score: 3.2, status: "needs-improvement" },
    { metric: "Time to First Byte", score: 0.8, status: "good" },
    { metric: "Cumulative Layout Shift", score: 0.15, status: "needs-improvement" },
  ]

  const aiRecommendations = [
    {
      category: "Content Optimization",
      suggestions: [
        "Add 800-1000 more words focusing on long-tail keywords",
        "Include FAQ section with common user questions",
        "Add comparison tables with competitor features",
        "Create step-by-step tutorials or guides",
      ],
    },
    {
      category: "Technical SEO",
      suggestions: [
        "Implement JSON-LD structured data for articles",
        "Add breadcrumb navigation with schema markup",
        "Optimize images with descriptive alt text",
        "Create XML sitemap and submit to search engines",
      ],
    },
    {
      category: "User Experience",
      suggestions: [
        "Reduce page load time by optimizing images",
        "Add internal search functionality",
        "Implement related posts section",
        "Improve navigation with clear menu structure",
      ],
    },
  ]

  const filteredMetrics = seoMetrics
    .filter((metric) => !hidePassedItems || metric.status !== "pass")
    .sort((a, b) => {
      if (showCriticalFirst) {
        const statusOrder = { fail: 0, warning: 1, pass: 2 }
        return statusOrder[a.status] - statusOrder[b.status]
      }
      return 0
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return <Badge className="bg-green-100 text-green-800">✅ Passed</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Warning</Badge>
      case "fail":
        return <Badge className="bg-red-100 text-red-800">❌ Failed</Badge>
      default:
        return null
    }
  }

  const handleExportPDF = () => {
    toast({
      title: "PDF Export Started",
      description: "Your SEO report is being generated...",
    })
    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your SEO report has been downloaded successfully.",
      })
    }, 2000)
  }

  const handleCopyJSON = () => {
    const reportData = {
      analysis: analysisData,
      metrics: seoMetrics,
      competitors: competitorData,
      recommendations: aiRecommendations,
    }
    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2))
    toast({
      title: "JSON Copied",
      description: "Report data copied to clipboard.",
    })
  }

  if (!analysisData) {
    return (
      <>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <Card className="p-8 text-center">
              <CardHeader>
                <CardTitle>No Analysis Data Found</CardTitle>
                <CardDescription>Please start a new analysis from the home page.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </SidebarInset>
      </>
    )
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">SEO Dashboard</span>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">SEO Analysis Results</h1>
            <p className="text-slate-600">
              Analysis for "{analysisData.keyword}" on {analysisData.websiteUrl}
            </p>
          </motion.div>

          {/* Overall Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Overall SEO Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="68, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">68</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Good Foundation</p>
                    <p className="text-slate-600">
                      Your site has solid SEO fundamentals but needs improvement in content and technical areas.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">4 Passed</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">3 Warnings</Badge>
                      <Badge className="bg-red-100 text-red-800">2 Critical</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
                <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="report">Report</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>SEO Audit Results</CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch checked={hidePassedItems} onCheckedChange={setHidePassedItems} />
                          <span className="text-sm">Hide passed items</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={showCriticalFirst} onCheckedChange={setShowCriticalFirst} />
                          <span className="text-sm">Critical issues first</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredMetrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                          {getStatusIcon(metric.status)}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{metric.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{metric.score}/100</span>
                                {getStatusBadge(metric.status)}
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">{metric.description}</p>
                            {metric.recommendation && (
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <Lightbulb className="w-4 h-4 inline mr-1" />
                                  {metric.recommendation}
                                </p>
                              </div>
                            )}
                            <Progress value={metric.score} className="h-2" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Competitors Tab */}
              <TabsContent value="competitors" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={competitorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Radar Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name="Your Site"
                            dataKey="yourSite"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                          />
                          <Radar
                            name="Top Competitor"
                            dataKey="competitor1"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.1}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Gap Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <h4 className="font-semibold text-red-800">Missing Keywords</h4>
                          <p className="text-2xl font-bold text-red-600">47</p>
                          <p className="text-sm text-red-600">Keywords competitors rank for</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <h4 className="font-semibold text-yellow-800">Opportunity Keywords</h4>
                          <p className="text-2xl font-bold text-yellow-600">23</p>
                          <p className="text-sm text-yellow-600">Easy wins available</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800">Unique Keywords</h4>
                          <p className="text-2xl font-bold text-green-600">12</p>
                          <p className="text-sm text-green-600">Keywords only you rank for</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Recommendations Tab */}
              <TabsContent value="recommendations" className="space-y-4">
                {aiRecommendations.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {category.suggestions.map((suggestion, suggestionIndex) => (
                            <div key={suggestionIndex} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-blue-600">{suggestionIndex + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{suggestion}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-2 h-8 px-3"
                                  onClick={() => {
                                    navigator.clipboard.writeText(suggestion)
                                    toast({
                                      title: "Copied to clipboard",
                                      description: "Suggestion copied successfully.",
                                    })
                                  }}
                                >
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        Core Web Vitals
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {performanceData.map((metric, index) => (
                          <div key={metric.metric} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{metric.metric}</span>
                              <Badge
                                variant={metric.status === "good" ? "default" : "secondary"}
                                className={
                                  metric.status === "good"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {metric.score}s
                              </Badge>
                            </div>
                            <Progress value={metric.status === "good" ? 80 : 50} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Mobile Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-semibold text-green-800">Mobile Friendly</span>
                          </div>
                          <p className="text-sm text-green-700">Your page is optimized for mobile devices</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Viewport Configuration</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Touch Elements Size</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Text Readability</span>
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Report Tab */}
              <TabsContent value="report" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Your SEO Report</CardTitle>
                    <CardDescription>Generate and download your comprehensive SEO analysis report</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-3">
                        <Button onClick={handleExportPDF} className="h-20 flex-col gap-2">
                          <Download className="w-6 h-6" />
                          Download PDF
                        </Button>
                        <Button onClick={handleCopyJSON} variant="outline" className="h-20 flex-col gap-2">
                          <Copy className="w-6 h-6" />
                          Copy JSON
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Download className="w-6 h-6" />
                          Export HTML
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Report Sections</h4>
                        <div className="grid gap-2 md:grid-cols-2">
                          {[
                            "Executive Summary",
                            "SEO Audit Results",
                            "Competitor Analysis",
                            "AI Recommendations",
                            "Performance Metrics",
                            "Action Plan",
                          ].map((section) => (
                            <div key={section} className="flex items-center gap-2">
                              <Switch defaultChecked />
                              <span className="text-sm">{section}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </SidebarInset>
    </>
  )
}

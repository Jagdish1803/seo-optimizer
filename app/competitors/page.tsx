"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Target, Search, ExternalLink, Eye } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

interface Competitor {
  id: string
  domain: string
  title: string
  url: string
  rank: number
  score: number
  traffic: number
  keywords: number
  backlinks: number
  contentLength: number
  loadTime: number
  mobileScore: number
}

export default function CompetitorsPage() {
  const [searchKeyword, setSearchKeyword] = useState("best SEO tools")

  const competitors: Competitor[] = [
    {
      id: "1",
      domain: "seoexpert.com",
      title: "Best SEO Tools 2024 - Complete Guide",
      url: "https://seoexpert.com/tools-guide",
      rank: 1,
      score: 95,
      traffic: 45000,
      keywords: 340,
      backlinks: 180,
      contentLength: 2100,
      loadTime: 2.1,
      mobileScore: 98,
    },
    {
      id: "2",
      domain: "marketingpro.com",
      title: "Top 10 SEO Software Solutions",
      url: "https://marketingpro.com/seo-software",
      rank: 2,
      score: 88,
      traffic: 32000,
      keywords: 280,
      backlinks: 120,
      contentLength: 1800,
      loadTime: 1.8,
      mobileScore: 95,
    },
    {
      id: "3",
      domain: "digitalmarketing.org",
      title: "SEO Tools Comparison & Reviews",
      url: "https://digitalmarketing.org/seo-comparison",
      rank: 3,
      score: 82,
      traffic: 28000,
      keywords: 200,
      backlinks: 90,
      contentLength: 1500,
      loadTime: 2.5,
      mobileScore: 92,
    },
    {
      id: "4",
      domain: "yoursite.com",
      title: "Your SEO Tools Guide",
      url: "https://yoursite.com/seo-guide",
      rank: 8,
      score: 68,
      traffic: 8000,
      keywords: 120,
      backlinks: 45,
      contentLength: 800,
      loadTime: 3.2,
      mobileScore: 85,
    },
  ]

  const trafficData = [
    { month: "Jan", yourSite: 6000, competitor1: 42000, competitor2: 30000 },
    { month: "Feb", yourSite: 6500, competitor1: 43000, competitor2: 31000 },
    { month: "Mar", yourSite: 7000, competitor1: 44000, competitor2: 31500 },
    { month: "Apr", yourSite: 7200, competitor1: 44500, competitor2: 32000 },
    { month: "May", yourSite: 7800, competitor1: 45000, competitor2: 32000 },
    { month: "Jun", yourSite: 8000, competitor1: 45000, competitor2: 32000 },
  ]

  const keywordGapData = [
    { name: "Shared Keywords", value: 45, color: "#3b82f6" },
    { name: "Your Unique", value: 12, color: "#10b981" },
    { name: "Competitor Only", value: 67, color: "#ef4444" },
    { name: "Opportunity", value: 23, color: "#f59e0b" },
  ]

  const contentGapData = [
    { topic: "Tool Reviews", yourSite: 3, competitors: 15 },
    { topic: "Tutorials", yourSite: 2, competitors: 12 },
    { topic: "Comparisons", yourSite: 1, competitors: 8 },
    { topic: "Case Studies", yourSite: 0, competitors: 6 },
    { topic: "Best Practices", yourSite: 4, competitors: 10 },
  ]

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return <Badge className="bg-green-100 text-green-800">#{rank}</Badge>
    if (rank <= 10) return <Badge className="bg-yellow-100 text-yellow-800">#{rank}</Badge>
    return <Badge className="bg-red-100 text-red-800">#{rank}</Badge>
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Competitor Analysis</span>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-8 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
            <p className="text-slate-600">Analyze your competition and discover opportunities to outrank them.</p>
          </motion.div>

          {/* Search Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Analyze Competitors for Keyword</CardTitle>
                <CardDescription>Enter a keyword to see who's ranking and how you compare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter keyword to analyze..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button className="h-12 px-8">
                    <Search className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Competitor Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Top Competitors for "{searchKeyword}"</CardTitle>
                <CardDescription>Current ranking positions and key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((competitor, index) => (
                    <motion.div
                      key={competitor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 border rounded-lg ${
                        competitor.domain === "yoursite.com" ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getRankBadge(competitor.rank)}
                            <h4 className="font-semibold text-lg">{competitor.domain}</h4>
                            {competitor.domain === "yoursite.com" && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                Your Site
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-600 mb-3">{competitor.title}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">SEO Score</span>
                              <p className={`font-semibold ${getScoreColor(competitor.score)}`}>
                                {competitor.score}/100
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-500">Monthly Traffic</span>
                              <p className="font-semibold">{competitor.traffic.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Keywords</span>
                              <p className="font-semibold">{competitor.keywords}</p>
                            </div>
                            <div>
                              <span className="text-slate-500">Backlinks</span>
                              <p className="font-semibold">{competitor.backlinks}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Analysis Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Tabs defaultValue="traffic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="traffic">Traffic Trends</TabsTrigger>
                <TabsTrigger value="keywords">Keyword Gaps</TabsTrigger>
                <TabsTrigger value="content">Content Gaps</TabsTrigger>
                <TabsTrigger value="technical">Technical SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="traffic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Comparison Over Time</CardTitle>
                    <CardDescription>Monthly organic traffic trends for you vs top competitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="yourSite" stroke="#3b82f6" strokeWidth={3} name="Your Site" />
                        <Line
                          type="monotone"
                          dataKey="competitor1"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Top Competitor"
                        />
                        <Line
                          type="monotone"
                          dataKey="competitor2"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          name="Competitor 2"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="keywords" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Distribution</CardTitle>
                      <CardDescription>How your keywords overlap with competitors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={keywordGapData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {keywordGapData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Opportunities</CardTitle>
                      <CardDescription>High-impact keywords you're missing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { keyword: "seo audit tool", difficulty: "Medium", volume: "2.4K", gap: "High" },
                          { keyword: "best seo software", difficulty: "High", volume: "1.8K", gap: "Medium" },
                          { keyword: "seo tool comparison", difficulty: "Low", volume: "900", gap: "High" },
                          { keyword: "free seo tools", difficulty: "High", volume: "3.2K", gap: "Low" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium">{item.keyword}</p>
                              <p className="text-sm text-slate-600">Volume: {item.volume}/month</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline">{item.difficulty}</Badge>
                              <Badge
                                className={
                                  item.gap === "High"
                                    ? "bg-red-100 text-red-800"
                                    : item.gap === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {item.gap} Gap
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Gap Analysis</CardTitle>
                    <CardDescription>Content topics where competitors are ahead</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={contentGapData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="yourSite" fill="#3b82f6" name="Your Content" />
                        <Bar dataKey="competitors" fill="#ef4444" name="Competitor Average" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Page Speed Comparison</CardTitle>
                      <CardDescription>Loading times across competitors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {competitors.map((competitor) => (
                          <div key={competitor.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {competitor.domain === "yoursite.com" ? "Your Site" : competitor.domain}
                              </span>
                              <span
                                className={`text-sm font-semibold ${
                                  competitor.loadTime <= 2
                                    ? "text-green-600"
                                    : competitor.loadTime <= 3
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {competitor.loadTime}s
                              </span>
                            </div>
                            <Progress value={Math.max(0, 100 - competitor.loadTime * 20)} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile Optimization</CardTitle>
                      <CardDescription>Mobile-friendliness scores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {competitors.map((competitor) => (
                          <div key={competitor.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {competitor.domain === "yoursite.com" ? "Your Site" : competitor.domain}
                              </span>
                              <span className={`text-sm font-semibold ${getScoreColor(competitor.mobileScore)}`}>
                                {competitor.mobileScore}/100
                              </span>
                            </div>
                            <Progress value={competitor.mobileScore} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </SidebarInset>
    </>
  )
}

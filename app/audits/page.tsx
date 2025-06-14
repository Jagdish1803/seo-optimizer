"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  History,
  Search,
  MoreHorizontal,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AuditRecord {
  id: string
  keyword: string
  url: string
  score: number
  status: "completed" | "in-progress" | "failed"
  timestamp: string
  competitorCount: number
}

export default function AuditsPage() {
  const [audits, setAudits] = useState<AuditRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAudits, setFilteredAudits] = useState<AuditRecord[]>([])
  const { toast } = useToast()
  const router = useRouter()

  // Mock audit data
  const mockAudits: AuditRecord[] = [
    {
      id: "1",
      keyword: "best SEO tools",
      url: "https://example.com/seo-tools",
      score: 68,
      status: "completed",
      timestamp: "2024-01-15T10:30:00Z",
      competitorCount: 5,
    },
    {
      id: "2",
      keyword: "digital marketing guide",
      url: "https://example.com/marketing-guide",
      score: 75,
      status: "completed",
      timestamp: "2024-01-14T15:45:00Z",
      competitorCount: 3,
    },
    {
      id: "3",
      keyword: "content optimization",
      url: "https://example.com/content-tips",
      score: 0,
      status: "in-progress",
      timestamp: "2024-01-16T09:15:00Z",
      competitorCount: 5,
    },
    {
      id: "4",
      keyword: "local SEO strategies",
      url: "https://example.com/local-seo",
      score: 0,
      status: "failed",
      timestamp: "2024-01-13T14:20:00Z",
      competitorCount: 4,
    },
    {
      id: "5",
      keyword: "e-commerce SEO",
      url: "https://example.com/ecommerce-seo",
      score: 82,
      status: "completed",
      timestamp: "2024-01-12T11:10:00Z",
      competitorCount: 5,
    },
  ]

  useEffect(() => {
    // Load audits from localStorage or use mock data
    const savedAudits = localStorage.getItem("seoAudits")
    if (savedAudits) {
      setAudits(JSON.parse(savedAudits))
    } else {
      setAudits(mockAudits)
      localStorage.setItem("seoAudits", JSON.stringify(mockAudits))
    }
  }, [])

  useEffect(() => {
    const filtered = audits.filter(
      (audit) =>
        audit.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.url.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredAudits(filtered)
  }, [audits, searchTerm])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">{score}</Badge>
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">{score}</Badge>
    if (score > 0) return <Badge className="bg-red-100 text-red-800">{score}</Badge>
    return <Badge variant="secondary">-</Badge>
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewAudit = (auditId: string) => {
    const audit = audits.find((a) => a.id === auditId)
    if (audit && audit.status === "completed") {
      // Store the audit data for the dashboard
      localStorage.setItem(
        "currentAnalysis",
        JSON.stringify({
          keyword: audit.keyword,
          websiteUrl: audit.url,
          competitors: [],
          timestamp: audit.timestamp,
        }),
      )
      router.push("/dashboard")
    } else {
      toast({
        title: "Audit Not Available",
        description: "This audit is not completed or has failed.",
        variant: "destructive",
      })
    }
  }

  const handleRerunAudit = (auditId: string) => {
    const audit = audits.find((a) => a.id === auditId)
    if (audit) {
      // Update audit status to in-progress
      const updatedAudits = audits.map((a) => (a.id === auditId ? { ...a, status: "in-progress" as const } : a))
      setAudits(updatedAudits)
      localStorage.setItem("seoAudits", JSON.stringify(updatedAudits))

      toast({
        title: "Audit Restarted",
        description: "The audit has been queued for re-analysis.",
      })

      // Simulate completion after 3 seconds
      setTimeout(() => {
        const completedAudits = updatedAudits.map((a) =>
          a.id === auditId
            ? {
                ...a,
                status: "completed" as const,
                score: Math.floor(Math.random() * 40) + 60,
                timestamp: new Date().toISOString(),
              }
            : a,
        )
        setAudits(completedAudits)
        localStorage.setItem("seoAudits", JSON.stringify(completedAudits))

        toast({
          title: "Audit Completed",
          description: "Your SEO audit has been updated successfully.",
        })
      }, 3000)
    }
  }

  const handleDeleteAudit = (auditId: string) => {
    const updatedAudits = audits.filter((a) => a.id !== auditId)
    setAudits(updatedAudits)
    localStorage.setItem("seoAudits", JSON.stringify(updatedAudits))

    toast({
      title: "Audit Deleted",
      description: "The audit record has been removed.",
    })
  }

  const handleDownloadReport = (auditId: string) => {
    const audit = audits.find((a) => a.id === auditId)
    if (audit && audit.status === "completed") {
      toast({
        title: "Download Started",
        description: "Your SEO report is being prepared...",
      })

      // Simulate download
      setTimeout(() => {
        toast({
          title: "Download Complete",
          description: "Your SEO report has been downloaded successfully.",
        })
      }, 2000)
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Past Audits</span>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-8 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Audit History</h1>
            <p className="text-slate-600">View, manage, and re-run your previous SEO audits.</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-4 md:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
                <History className="h-4 w-4 text-slate-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{audits.length}</div>
                <p className="text-xs text-slate-600">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {audits.filter((a) => a.status === "completed").length}
                </div>
                <p className="text-xs text-slate-600">Successfully analyzed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <RefreshCw className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {audits.filter((a) => a.status === "in-progress").length}
                </div>
                <p className="text-xs text-slate-600">Currently analyzing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {audits.filter((a) => a.status === "failed").length}
                </div>
                <p className="text-xs text-slate-600">Need attention</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Filter by Date
            </Button>
          </motion.div>

          {/* Audits Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Audit Records</CardTitle>
                <CardDescription>
                  {filteredAudits.length} audit{filteredAudits.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Competitors</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAudits.map((audit, index) => (
                      <motion.tr
                        key={audit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <TableCell className="font-medium">{audit.keyword}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          <a
                            href={audit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {audit.url}
                          </a>
                        </TableCell>
                        <TableCell>{getScoreBadge(audit.score)}</TableCell>
                        <TableCell>{getStatusBadge(audit.status)}</TableCell>
                        <TableCell className="text-slate-600">{formatDate(audit.timestamp)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{audit.competitorCount} sites</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewAudit(audit.id)}
                                disabled={audit.status !== "completed"}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Results
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDownloadReport(audit.id)}
                                disabled={audit.status !== "completed"}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRerunAudit(audit.id)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Re-run Audit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteAudit(audit.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>

                {filteredAudits.length === 0 && (
                  <div className="text-center py-8">
                    <History className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-sm font-semibold text-slate-900">No audits found</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {searchTerm
                        ? "Try adjusting your search terms."
                        : "Start your first SEO audit to see results here."}
                    </p>
                    {!searchTerm && (
                      <div className="mt-6">
                        <Button onClick={() => router.push("/")}>Start New Audit</Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SidebarInset>
    </>
  )
}

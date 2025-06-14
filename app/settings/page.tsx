"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Moon, Sun, Globe, Target, Zap, Upload } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [competitorCount, setCompetitorCount] = useState("5")
  const [language, setLanguage] = useState("en")
  const [keywordMatch, setKeywordMatch] = useState("partial")
  const [aiSuggestions, setAiSuggestions] = useState(true)
  const [brandLogo, setBrandLogo] = useState("")
  const { toast } = useToast()

  const handleSaveSettings = () => {
    const settings = {
      darkMode,
      competitorCount,
      language,
      keywordMatch,
      aiSuggestions,
      brandLogo,
    }

    localStorage.setItem("seoOptimizerSettings", JSON.stringify(settings))

    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBrandLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="font-semibold">Settings & Preferences</span>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-8 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-slate-600">Customize your SEO Optimizer experience and preferences.</p>
          </motion.div>

          <div className="grid gap-6">
            {/* Appearance Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-slate-600">Switch between light and dark themes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      <Moon className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analysis Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Analysis Preferences
                  </CardTitle>
                  <CardDescription>Configure how your SEO analysis is performed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="competitor-count">Default Competitor Count</Label>
                      <Select value={competitorCount} onValueChange={setCompetitorCount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 Competitors</SelectItem>
                          <SelectItem value="5">5 Competitors</SelectItem>
                          <SelectItem value="10">10 Competitors</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-500">Number of competitors to analyze by default</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keyword-match">Keyword Match Type</Label>
                      <Select value={keywordMatch} onValueChange={setKeywordMatch}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select match type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exact">Exact Match</SelectItem>
                          <SelectItem value="partial">Partial Match</SelectItem>
                          <SelectItem value="broad">Broad Match</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-500">How strictly to match keywords in analysis</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">AI-Powered Suggestions</Label>
                      <p className="text-sm text-slate-600">Enable AI-generated recommendations and insights</p>
                    </div>
                    <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Localization Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Localization
                  </CardTitle>
                  <CardDescription>Set your preferred language and region settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="it">Italiano</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">Language for the interface and reports</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Branding Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Branding
                  </CardTitle>
                  <CardDescription>Customize reports with your brand identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-logo">Brand Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                        {brandLogo ? (
                          <img
                            src={brandLogo || "/placeholder.svg"}
                            alt="Brand logo"
                            className="w-full h-full object-contain rounded"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Upload your logo to include in exported reports (PNG, JPG, SVG)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data & Privacy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Manage your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full md:w-auto">
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto">
                      Clear Analysis History
                    </Button>
                    <Button variant="destructive" className="w-full md:w-auto">
                      Delete All Data
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    All data is stored locally in your browser. No data is sent to external servers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-end"
            >
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </motion.div>
          </div>
        </div>
      </SidebarInset>
    </>
  )
}

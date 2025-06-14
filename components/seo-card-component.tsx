import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Competitor {
    id: number;
    name: string;
    url: string;
    rank: number;
    score: number;
}

const mockCompetitors: Competitor[] = [
    {
        id: 1,
        name: "Competitor 1",
        url: "https://competitor1.com",
        rank: 1,
        score: 85
    },
    {
        id: 2,
        name: "Competitor 2",
        url: "https://competitor2.com",
        rank: 2,
        score: 78
    },
    {
        id: 3,
        name: "Competitor 3",
        url: "https://competitor3.com",
        rank: 3,
        score: 72
    }
];

export function SeoCardComponent() {
    const [keyword, setKeyword] = useState("")
    const [websiteUrl, setWebsiteUrl] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [showCompetitorModal, setShowCompetitorModal] = useState(false)
    const [competitors, setCompetitors] = useState<Competitor[]>([])
    const { toast } = useToast()

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

    return(
        <>
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
                    <search className="w-5 h-5 mr-2" />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                </Button>
              </CardContent>
            </Card>
        </>
    )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Loader2, TrendingUp, TrendingDown, Minus, Clock, Trash2, Plus, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CompetitorInfo {
  name: string
  websiteUrl: string
  socialMedia: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
  }
  hasApiKey: boolean
  apiKey?: string
}

interface CompetitorData {
  name: string
  summary: string
  impact: "improvement" | "loss" | "neutral"
  suggestion: string
  timestamp: string
}

export default function CompetitorDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [savedCompetitors, setSavedCompetitors] = useState<CompetitorInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<CompetitorData[]>([])
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly">("weekly")
  const { toast } = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<CompetitorInfo>({
    name: "",
    websiteUrl: "",
    socialMedia: {},
    hasApiKey: false,
  })

  const [loadingCompetitor, setLoadingCompetitor] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("savedCompetitors")
    if (saved) {
      try {
        setSavedCompetitors(JSON.parse(saved))
      } catch (error) {
        console.error("[v0] Error loading saved competitors:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("savedCompetitors", JSON.stringify(savedCompetitors))
  }, [savedCompetitors])

  const handleAddCompetitor = () => {
    if (!formData.name.trim() || !formData.websiteUrl.trim()) {
      toast({
        title: "Error",
        description: "Competitor name and website URL are required",
        variant: "destructive",
      })
      return
    }

    const competitorExists = savedCompetitors.some((c) => c.name === formData.name)
    if (competitorExists) {
      toast({
        title: "Error",
        description: "This competitor is already in your list",
        variant: "destructive",
      })
      return
    }

    setSavedCompetitors([...savedCompetitors, formData])
    setIsDialogOpen(false)
    setFormData({
      name: "",
      websiteUrl: "",
      socialMedia: {},
      hasApiKey: false,
    })

    toast({
      title: "Success",
      description: `${formData.name} has been added to your list`,
    })
  }

  const handleRemoveCompetitor = (competitorName: string) => {
    setSavedCompetitors(savedCompetitors.filter((c) => c.name !== competitorName))
    toast({
      title: "Removed",
      description: `${competitorName} has been removed from your list`,
    })
  }

  const handleTrackUpdates = async () => {
    if (savedCompetitors.length === 0) {
      toast({
        title: "Error",
        description: "Please add competitors to your saved list first",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResults([])

    try {
      const response = await fetch("http://localhost:5000/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competitors: savedCompetitors,
          period: filter,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch competitor data")
      }

      const data = await response.json()
      setResults(data)

      toast({
        title: "Success",
        description: `Loaded ${filter} data for ${data.length} competitor(s)`,
      })
    } catch (error) {
      console.error("[v0] Error fetching competitor data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch competitor data. Please check your API connection.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTrackSingleCompetitor = async (competitor: CompetitorInfo) => {
    setLoadingCompetitor(competitor.name)

    try {
      const response = await fetch("http://localhost:5000/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competitors: [competitor],
          period: filter,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch competitor data")
      }

      const data = await response.json()

      setResults((prevResults) => {
        const filtered = prevResults.filter((r) => r.name !== competitor.name)
        return [...filtered, ...data]
      })

      toast({
        title: "Success",
        description: `Generated ${filter} report for ${competitor.name}`,
      })
    } catch (error) {
      console.error("[v0] Error fetching competitor data:", error)
      toast({
        title: "Error",
        description: `Failed to generate report for ${competitor.name}. Please check your API connection.`,
        variant: "destructive",
      })
    } finally {
      setLoadingCompetitor(null)
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "improvement":
        return <TrendingUp className="h-5 w-5 text-green-400" aria-label="Improvement" />
      case "loss":
        return <TrendingDown className="h-5 w-5 text-red-400" aria-label="Loss" />
      default:
        return <Minus className="h-5 w-5 text-yellow-400" aria-label="Neutral" />
    }
  }

  const getImpactText = (impact: string) => {
    switch (impact) {
      case "improvement":
        return "Positive Impact"
      case "loss":
        return "Negative Impact"
      default:
        return "Neutral Impact"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-[#3d1f5c] text-white shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-pretty sm:text-2xl">Competitor Intelligence Tracker</h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline gap-4">
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="/reviews"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Reviews
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Settings
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-[#2a1540]"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#2a1540] md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="/reviews"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Reviews
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#2a1540] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Settings
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg bg-card p-4 shadow-md">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">Report Filters</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("daily")}
              className={
                filter === "daily"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-foreground hover:bg-card/80"
              }
            >
              Daily
            </Button>
            <Button
              variant={filter === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("weekly")}
              className={
                filter === "weekly"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-foreground hover:bg-card/80"
              }
            >
              Weekly
            </Button>
            <Button
              variant={filter === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("monthly")}
              className={
                filter === "monthly"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-foreground hover:bg-card/80"
              }
            >
              Monthly
            </Button>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground text-balance">Saved Competitors</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground transition-all hover:bg-primary/90 focus:ring-2 focus:ring-ring">
                <Plus className="mr-2 h-4 w-4" />
                Add Competitor
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card text-foreground sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-foreground">Add New Competitor</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Enter competitor details to add them to your tracking list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Competitor Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Company A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-foreground">
                    Website URL <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground">Social Media Accounts (Optional)</Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="LinkedIn URL"
                      value={formData.socialMedia.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
                        })
                      }
                      className="border-border bg-input text-foreground"
                    />
                    <Input
                      placeholder="Instagram URL"
                      value={formData.socialMedia.instagram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: { ...formData.socialMedia, instagram: e.target.value },
                        })
                      }
                      className="border-border bg-input text-foreground"
                    />
                    <Input
                      placeholder="Facebook URL"
                      value={formData.socialMedia.facebook || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: { ...formData.socialMedia, facebook: e.target.value },
                        })
                      }
                      className="border-border bg-input text-foreground"
                    />
                    <Input
                      placeholder="Twitter URL"
                      value={formData.socialMedia.twitter || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialMedia: { ...formData.socialMedia, twitter: e.target.value },
                        })
                      }
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground">Do you have official API key?</Label>
                  <RadioGroup
                    value={formData.hasApiKey ? "yes" : "no"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        hasApiKey: value === "yes",
                        apiKey: value === "no" ? "" : formData.apiKey,
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal text-foreground">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal text-foreground">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasApiKey && (
                  <div className="space-y-2">
                    <Label htmlFor="apiKey" className="text-foreground">
                      API Key
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter API key"
                      value={formData.apiKey || ""}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-border text-foreground hover:bg-card/80"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddCompetitor}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add Competitor
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {savedCompetitors.length > 0 && (
          <div className="mb-8 rounded-lg bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{savedCompetitors.length} competitor(s) tracked</p>
              <Button
                onClick={handleTrackUpdates}
                disabled={loading}
                className="bg-primary text-primary-foreground transition-all hover:bg-primary/90 focus:ring-2 focus:ring-ring disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  `Track All Competitors`
                )}
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {savedCompetitors.map((competitor) => (
                <div
                  key={competitor.name}
                  className="flex min-w-[250px] flex-row items-center justify-between gap-4 rounded-lg border-2 border-border bg-muted px-6 py-4"
                >
                  <span className="text-sm font-medium text-foreground">{competitor.name}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleTrackSingleCompetitor(competitor)}
                      disabled={loadingCompetitor === competitor.name}
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {loadingCompetitor === competitor.name ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-3 w-3" />
                          Report
                        </>
                      )}
                    </Button>
                    <button
                      onClick={() => handleRemoveCompetitor(competitor.name)}
                      className="rounded-full p-2 transition-colors hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-destructive"
                      aria-label={`Remove ${competitor.name}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse border-border bg-card shadow-lg">
                <CardHeader>
                  <div className="h-6 w-3/4 rounded bg-muted" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                  <div className="h-4 w-4/6 rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground text-balance">
                {filter.charAt(0).toUpperCase() + filter.slice(1)} Report
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing {filter} insights for {results.length} competitor(s)
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="animate-in fade-in slide-in-from-bottom-4 border-2 border-[#b8a8d9] bg-[#4a3f5c] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-xl font-bold text-white text-balance">
                      {result.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm">Last Updated: {result.timestamp}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#b8a8d9]">
                        Summary of Changes
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-200 text-pretty">{result.summary}</p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#b8a8d9]">
                        Impact Analysis
                      </h3>
                      <div className="flex items-center gap-2">
                        {getImpactIcon(result.impact)}
                        <span className="text-sm font-medium text-white">{getImpactText(result.impact)}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#b8a8d9]">
                        Suggested Action for Your Company
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-200 text-pretty">{result.suggestion}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && results.length === 0 && savedCompetitors.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border bg-card/50 p-12 text-center">
            <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">No Competitors Saved Yet</h3>
            <p className="text-sm text-muted-foreground">
              Click the "Add Competitor" button above to start tracking competitors and generate reports.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 bg-card py-6 text-foreground" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm">© 2025 Competitor Intelligence Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

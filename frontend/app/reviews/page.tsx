"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, X, Check, AlertTriangle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReviewTask {
  id: string
  title: string
  status: "pending" | "completed"
  isUrgent: boolean
  timestamp: string
}

export default function ReviewsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "daily" | "pending">("all")
  const { toast } = useToast()

  const [reviews, setReviews] = useState<ReviewTask[]>([
    {
      id: "1",
      title: "Review Google updates",
      status: "pending",
      isUrgent: false,
      timestamp: "2025-01-15 10:30 AM",
    },
    {
      id: "2",
      title: "Analyze Amazon pricing changes",
      status: "completed",
      isUrgent: false,
      timestamp: "2025-01-14 03:45 PM",
    },
    {
      id: "3",
      title: "Check Microsoft product launch",
      status: "pending",
      isUrgent: true,
      timestamp: "2025-01-15 09:00 AM",
    },
  ])

  const handleToggleComplete = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: review.status === "pending" ? "completed" : "pending" } : review,
      ),
    )

    const review = reviews.find((r) => r.id === id)
    if (review) {
      toast({
        title: review.status === "pending" ? "Task Completed" : "Task Reopened",
        description: `"${review.title}" has been ${review.status === "pending" ? "marked as complete" : "reopened"}`,
      })
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "daily") {
      const today = new Date().toDateString()
      const reviewDate = new Date(review.timestamp).toDateString()
      return reviewDate === today
    }
    if (filter === "pending") {
      return review.status === "pending"
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#D3D3D3]">
      <nav className="bg-[#4B0082] text-white shadow-lg" role="navigation" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-pretty sm:text-2xl">Competitor Intelligence Tracker</h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline gap-4">
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Dashboard
                </a>
                <a
                  href="/reviews"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
                  aria-current="page"
                >
                  Reviews
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
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
                className="text-white hover:bg-[#3a0066]"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#3a0066] md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Dashboard
              </a>
              <a
                href="/reviews"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
                aria-current="page"
              >
                Reviews
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-[#3a0066] focus:outline-none focus:ring-2 focus:ring-white"
              >
                Settings
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg bg-[#4B0082] p-6 shadow-lg">
          <h2 className="mb-4 text-3xl font-bold text-[#C8A2C8] text-balance">Review Results</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-[#C8A2C8] text-[#4B0082] hover:bg-[#b891b8]"
                  : "border-[#C8A2C8] text-[#C8A2C8] hover:bg-[#3a0066]"
              }
            >
              All Reviews
            </Button>
            <Button
              variant={filter === "daily" ? "default" : "outline"}
              onClick={() => setFilter("daily")}
              className={
                filter === "daily"
                  ? "bg-[#C8A2C8] text-[#4B0082] hover:bg-[#b891b8]"
                  : "border-[#C8A2C8] text-[#C8A2C8] hover:bg-[#3a0066]"
              }
            >
              Daily Reviews
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              className={
                filter === "pending"
                  ? "bg-[#C8A2C8] text-[#4B0082] hover:bg-[#b891b8]"
                  : "border-[#C8A2C8] text-[#C8A2C8] hover:bg-[#3a0066]"
              }
            >
              Pending Reviews
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-[#2F2F2F]">
            Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review, index) => (
            <Card
              key={review.id}
              className={`animate-in fade-in slide-in-from-bottom-4 border-2 border-[#C8A2C8] bg-[#5D3A6D] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                review.status === "completed" ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2 text-lg font-bold text-white text-balance">
                  <span className="flex-1">{review.title}</span>
                  {review.isUrgent && (
                    <AlertTriangle
                      className="h-6 w-6 flex-shrink-0 text-red-500"
                      aria-label="Urgent"
                      title="High business impact - urgent review required"
                    />
                  )}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-[#C8A2C8]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">{review.timestamp}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide ${
                        review.status === "completed" ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {review.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <Button
                    onClick={() => handleToggleComplete(review.id)}
                    disabled={review.status === "completed"}
                    size="sm"
                    className={`transition-all ${
                      review.status === "completed"
                        ? "cursor-not-allowed bg-green-600 text-white opacity-50"
                        : "bg-[#4B0082] text-[#C8A2C8] hover:bg-[#3a0066]"
                    }`}
                    aria-label={review.status === "completed" ? "Task completed" : "Mark as complete"}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    {review.status === "completed" ? "Done" : "Complete"}
                  </Button>
                </div>

                {review.isUrgent && (
                  <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-200">
                    <p className="font-semibold">⚠️ High Priority</p>
                    <p className="text-xs">AI predicts significant business impact. Review immediately.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-[#C8A2C8] bg-white/50 p-12 text-center">
            <h3 className="mb-2 text-lg font-semibold text-[#2F2F2F]">No Reviews Found</h3>
            <p className="text-sm text-[#2F2F2F]">
              {filter === "daily"
                ? "No reviews scheduled for today."
                : filter === "pending"
                  ? "All reviews have been completed!"
                  : "No review tasks available."}
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 bg-[#2F2F2F] py-6 text-white" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm">© 2025 Competitor Intelligence Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

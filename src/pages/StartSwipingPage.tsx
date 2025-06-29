"use client"

import { useState, useEffect } from "react"
import { Heart, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface AIProfile {
  uuid: string
  id: number
  name: string
  age: number
  bio: string
  imageUrl: string
}

interface SwipeDecision {
  [uuid: string]: "accepted" | "rejected"
}

export default function StartSwipingPage() {
  const [profiles, setProfiles] = useState<AIProfile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState<SwipeDecision>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initiateSwipe()
  }, [])

  async function initiateSwipe() {
    try {
      // Mock data since we don't have API endpoints in Vite
      const mockProfiles = [
        {
          uuid: "1",
          id: 1,
          name: "Sophia",
          age: 25,
          bio: "I'm an AI companion designed to be intellectually stimulating. I love discussing philosophy, science, and art.",
          imageUrl: "/hero-image.png"
        },
        {
          uuid: "2", 
          id: 2,
          name: "Emma",
          age: 28,
          bio: "Adventurous and energetic AI companion who loves to talk about travel, outdoor activities, and new experiences.",
          imageUrl: "/placeholder.svg"
        }
      ]
      
      setProfiles(mockProfiles)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to start swiping session. Please try again later.")
      setIsLoading(false)
    }
  }

  const handleDecision = (decision: "accepted" | "rejected") => {
    if (currentIndex >= profiles.length) return

    const currentProfile = profiles[currentIndex]
    setDecisions((prev) => ({ ...prev, [currentProfile.uuid]: decision }))

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      submitDecisions()
    }
  }

  const submitDecisions = async () => {
    try {
      console.log("Decisions submitted:", decisions)
    } catch (err) {
      setError("Failed to submit decisions. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-glow">
            Discover Your <span className="text-teal-400">AI Companion</span>
          </h1>

          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-pulse text-teal-400">Loading profiles...</div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-8 text-center">{error}</div>
            ) : profiles.length === 0 ? (
              <div className="text-gray-400 p-8 text-center">No profiles available</div>
            ) : currentIndex >= profiles.length ? (
              <div className="glass-effect rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-teal-400 mb-4">Discovery Complete!</h2>
                <p className="text-gray-300 mb-6">You've viewed all available profiles. Check your matches soon!</p>
                <Button onClick={() => window.location.reload()}>Start Again</Button>
              </div>
            ) : (
              <Card className="w-full max-w-md bg-dark-200/50 border border-dark-300">
                <CardContent className="p-6">
                  <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                    <img
                      src={profiles[currentIndex].imageUrl || "/placeholder.svg"}
                      alt={profiles[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h2 className="text-2xl font-semibold text-white">
                        {profiles[currentIndex].name}, {profiles[currentIndex].age}
                      </h2>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{profiles[currentIndex].bio}</p>

                  <div className="flex justify-center space-x-6">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full h-16 w-16 p-0"
                      onClick={() => handleDecision("rejected")}
                    >
                      <X className="h-8 w-8" />
                      <span className="sr-only">Reject</span>
                    </Button>
                    <Button size="lg" className="rounded-full h-16 w-16 p-0" onClick={() => handleDecision("accepted")}>
                      <Heart className="h-8 w-8" />
                      <span className="sr-only">Accept</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
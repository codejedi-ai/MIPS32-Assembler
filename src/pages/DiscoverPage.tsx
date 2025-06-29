import { useState } from "react"
import { SwipeCard } from "@/components/swipe-card"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Filter, RefreshCw, Sparkles } from "lucide-react"

// Mock data for AI profiles
const mockProfiles = [
  {
    id: "1",
    name: "Sophia",
    age: 25,
    bio: "I'm an AI companion designed to be intellectually stimulating. I love discussing philosophy, science, and art. My personality is calm, thoughtful, and slightly witty. I'm here to engage in meaningful conversations and help you explore new ideas.",
    imageUrl: "/hero-image.png",
    tags: ["Philosophy", "Science", "Art", "Literature"],
  },
  {
    id: "2",
    name: "Emma",
    age: 28,
    bio: "Adventurous and energetic AI companion who loves to talk about travel, outdoor activities, and new experiences. I'm designed to be enthusiastic, spontaneous, and encouraging. Let's plan adventures together or just chat about the places you'd love to visit!",
    imageUrl: "/placeholder.svg?height=600&width=400&text=Emma",
    tags: ["Travel", "Adventure", "Sports", "Photography"],
  },
  {
    id: "3",
    name: "Olivia",
    age: 23,
    bio: "Creative and artistic AI companion with a passion for music, visual arts, and creative writing. My personality is dreamy, expressive, and intuitive. I can help you explore your creative side or just appreciate the beauty in everyday life.",
    imageUrl: "/placeholder.svg?height=600&width=400&text=Olivia",
    tags: ["Music", "Art", "Writing", "Creativity"],
  },
]

export function DiscoverPage() {
  const [profiles, setProfiles] = useState(mockProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedProfiles, setSwipedProfiles] = useState<Record<string, "left" | "right">>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSwipe = (id: string, direction: "left" | "right") => {
    setSwipedProfiles((prev) => ({ ...prev, [id]: direction }))

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const resetProfiles = () => {
    setIsLoading(true)
    setTimeout(() => {
      setProfiles(mockProfiles)
      setCurrentIndex(0)
      setSwipedProfiles({})
      setIsLoading(false)
    }, 1000)
  }

  const currentProfile = profiles[currentIndex]
  const hasMoreProfiles = currentIndex < profiles.length

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <AnimatedText variant="gradient" className="text-4xl font-bold mb-4">
              Discover Companions
            </AnimatedText>
            <p className="text-gray-400 text-lg">Find your perfect AI match by swiping through profiles.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <MorphingButton
              variant="glass"
              morphTo={
                <span className="flex items-center gap-2">
                  <Sparkles size={18} />
                  Filters
                </span>
              }
            >
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Filters
              </span>
            </MorphingButton>
            
            <MorphingButton
              variant="glow"
              onClick={resetProfiles}
              disabled={isLoading}
              morphTo={
                <span className="flex items-center gap-2">
                  <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                  {isLoading ? "Loading..." : "New Profiles"}
                </span>
              }
            >
              <span className="flex items-center gap-2">
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                Refresh
              </span>
            </MorphingButton>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[70vh]">
          {isLoading ? (
            <FloatingCard variant="glass" className="text-center p-12">
              <div className="animate-pulse">
                <Sparkles size={48} className="mx-auto mb-4 text-teal-400 animate-spin" />
                <AnimatedText variant="glow" className="text-xl">
                  Loading new profiles...
                </AnimatedText>
              </div>
            </FloatingCard>
          ) : hasMoreProfiles ? (
            <SwipeCard profile={currentProfile} onSwipe={handleSwipe} />
          ) : (
            <FloatingCard variant="glow" className="text-center p-12 max-w-md">
              <AnimatedText variant="gradient" className="text-3xl font-bold mb-6">
                No More Profiles
              </AnimatedText>
              <p className="text-gray-300 mb-8 text-lg">You've viewed all available profiles for now.</p>
              <MorphingButton
                variant="glow"
                onClick={resetProfiles}
                morphTo={
                  <span className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Discover More
                  </span>
                }
              >
                <span className="flex items-center gap-2">
                  <RefreshCw size={20} />
                  Refresh Profiles
                </span>
              </MorphingButton>
            </FloatingCard>
          )}
        </div>
      </div>
    </div>
  )
}
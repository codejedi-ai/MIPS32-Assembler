"use client"

import { useState } from "react"
import { Heart, X, Info, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"

interface SwipeCardProps {
  profile: {
    id: string
    name: string
    age: number
    bio: string
    imageUrl: string
    tags?: string[]
  }
  onSwipe: (id: string, direction: "left" | "right") => void
}

export function SwipeCard({ profile, onSwipe }: SwipeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full h-[600px] transform-style-3d transition-all duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Front of card (image) */}
        <FloatingCard 
          variant="glow"
          className={`swipe-card absolute inset-0 backface-hidden overflow-hidden ${isFlipped ? "rotate-y-180" : ""} ${isHovered ? 'shadow-2xl shadow-teal-500/30' : ''}`}
        >
          <div className="relative w-full h-full">
            <img
              src={profile.imageUrl || "/placeholder.svg"}
              alt={profile.name}
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-110"
            />
            
            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-teal-400/60 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <AnimatedText variant="gradient" className="text-2xl font-bold mb-2">
                {profile.name}, {profile.age}
              </AnimatedText>

              {profile.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.tags.map((tag, index) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-xs rounded-full bg-teal-500/20 text-teal-300 backdrop-blur-sm border border-teal-500/30 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <MorphingButton
              variant="glass"
              className="absolute top-4 right-4 w-12 h-12 rounded-full p-0"
              onClick={() => setIsFlipped(true)}
              morphTo={<Sparkles size={20} />}
            >
              <Info size={20} />
            </MorphingButton>
          </div>
        </FloatingCard>

        {/* Back of card (bio) */}
        <FloatingCard 
          variant="glass"
          className={`swipe-card absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? "" : "hidden"}`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <AnimatedText variant="gradient" className="text-2xl font-bold">
                {profile.name}, {profile.age}
              </AnimatedText>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsFlipped(false)}
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-teal-300 mb-3 flex items-center gap-2">
                  <Sparkles size={18} />
                  About Me
                </h3>
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              </div>

              {profile.tags && (
                <div>
                  <h3 className="text-lg font-semibold text-teal-300 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.tags.map((tag, index) => (
                      <span 
                        key={tag} 
                        className="px-3 py-2 text-sm rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 backdrop-blur-sm border border-teal-500/30 hover:scale-105 transition-transform duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <MorphingButton
              variant="glow"
              className="w-full mt-6"
              onClick={() => {
                setIsFlipped(false)
                onSwipe(profile.id, "right")
              }}
              morphTo={
                <span className="flex items-center gap-2">
                  <Heart size={20} className="animate-pulse" />
                  Let's Connect!
                </span>
              }
            >
              <span className="flex items-center gap-2">
                <Heart size={20} />
                I'm Interested
              </span>
            </MorphingButton>
          </div>
        </FloatingCard>
      </div>

      {/* Swipe buttons */}
      <div className="flex justify-center space-x-6 mt-8">
        <MorphingButton
          variant="neon"
          className="h-16 w-16 rounded-full p-0"
          onClick={() => onSwipe(profile.id, "left")}
          morphTo={<X size={28} className="text-red-400" />}
        >
          <X size={24} className="text-red-500" />
        </MorphingButton>
        
        <MorphingButton
          variant="glow"
          className="h-16 w-16 rounded-full p-0"
          onClick={() => onSwipe(profile.id, "right")}
          morphTo={<Heart size={28} className="text-pink-400 animate-pulse" />}
        >
          <Heart size={24} className="text-teal-300" />
        </MorphingButton>
      </div>
    </div>
  )
}
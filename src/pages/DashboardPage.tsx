import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Heart, MessageSquare, User, Settings, Bell, Sparkles } from "lucide-react"

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <AnimatedText variant="gradient" className="text-4xl font-bold mb-4">
              Welcome back, Alex
            </AnimatedText>
            <p className="text-gray-400 text-lg">Here's what's happening with your AI companions today.</p>
          </div>
          <MorphingButton
            variant="glass"
            morphTo={
              <span className="flex items-center gap-2">
                <Sparkles size={18} />
                New Updates
              </span>
            }
          >
            <span className="flex items-center gap-2">
              <Bell size={18} />
              Notifications
            </span>
          </MorphingButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FloatingCard variant="glow" className="text-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Active Companions</p>
                <AnimatedText variant="gradient" className="text-3xl font-bold">
                  3
                </AnimatedText>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-r from-pink-500/20 to-red-500/20">
                <Heart size={24} className="text-pink-400" />
              </div>
            </div>
          </FloatingCard>

          <FloatingCard variant="glass" className="text-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Unread Messages</p>
                <AnimatedText variant="gradient" className="text-3xl font-bold">
                  12
                </AnimatedText>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
                <MessageSquare size={24} className="text-teal-400" />
              </div>
            </div>
          </FloatingCard>

          <FloatingCard variant="neon" className="text-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Profile Views</p>
                <AnimatedText variant="gradient" className="text-3xl font-bold">
                  87
                </AnimatedText>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <User size={24} className="text-purple-400" />
              </div>
            </div>
          </FloatingCard>

          <FloatingCard variant="gradient" className="text-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Subscription</p>
                <AnimatedText variant="gradient" className="text-3xl font-bold">
                  Pro
                </AnimatedText>
              </div>
              <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                <Settings size={24} className="text-yellow-400" />
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingCard variant="glow">
            <div className="text-center p-8">
              <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                Discover New Companions
              </AnimatedText>
              <p className="text-gray-400 mb-6">
                Find your perfect AI match by exploring our curated selection of companions.
              </p>
              <MorphingButton
                variant="glow"
                className="w-full"
                morphTo={
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    Start Exploring
                  </span>
                }
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Discover Now
                </span>
              </MorphingButton>
            </div>
          </FloatingCard>

          <FloatingCard variant="glass">
            <div className="text-center p-8">
              <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                Continue Conversations
              </AnimatedText>
              <p className="text-gray-400 mb-6">
                Catch up with your AI companions and continue your meaningful conversations.
              </p>
              <MorphingButton
                variant="glass"
                className="w-full"
                morphTo={
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    Open Messages
                  </span>
                }
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  View Messages
                </span>
              </MorphingButton>
            </div>
          </FloatingCard>
        </div>
      </div>
    </div>
  )
}
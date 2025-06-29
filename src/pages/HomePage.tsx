import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { SparklesIcon, HeartIcon, ShieldCheckIcon, ArrowRight, Zap } from "lucide-react"

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleStartSwiping = async () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      window.location.href = "/signin"
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <AnimatedText 
                variant="gradient" 
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              >
                Sculpt Your Perfect
              </AnimatedText>
              <AnimatedText 
                variant="glow" 
                className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
                delay={500}
              >
                AI Companion
              </AnimatedText>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '1s' }}>
                Galatea.AI brings the Pygmalion myth to life with cutting-edge artificial intelligence. Create,
                customize, and connect with your ideal AI partner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
                <MorphingButton
                  variant="glow"
                  className="text-xl px-12 py-6 rounded-2xl"
                  onClick={handleStartSwiping}
                  disabled={isLoading}
                  morphTo={
                    <span className="flex items-center gap-3">
                      <Zap size={24} className="animate-pulse" />
                      {isLoading ? "Loading..." : "Begin Your Journey"}
                    </span>
                  }
                >
                  <span className="flex items-center gap-3">
                    <SparklesIcon size={24} />
                    {isLoading ? "Loading..." : "Start Swiping"}
                  </span>
                </MorphingButton>
                
                <MorphingButton
                  variant="glass"
                  className="text-xl px-12 py-6 rounded-2xl"
                  morphTo={
                    <span className="flex items-center gap-3">
                      <ArrowRight size={24} />
                      Explore Demo
                    </span>
                  }
                >
                  <Link to="/loading" className="flex items-center gap-3">
                    <HeartIcon size={24} />
                    View Demo
                  </Link>
                </MorphingButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <AnimatedText variant="gradient" className="text-5xl font-bold mb-6">
                The Galatea Experience
              </AnimatedText>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover the future of AI companionship with our revolutionary platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <FloatingCard variant="glow" className="text-center group">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-pink-500/20 to-red-500/20 group-hover:from-pink-500/30 group-hover:to-red-500/30 transition-all duration-500">
                    <HeartIcon className="h-16 w-16 text-pink-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                  Artistic Creation
                </AnimatedText>
                <p className="text-gray-400 leading-relaxed">
                  Sculpt your ideal AI companion with our advanced personality customization tools and bring your vision to life.
                </p>
              </FloatingCard>

              <FloatingCard variant="glass" className="text-center group">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-500">
                    <SparklesIcon className="h-16 w-16 text-purple-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                  Bring to Life
                </AnimatedText>
                <p className="text-gray-400 leading-relaxed">
                  Watch your creation come to life with AI-powered conversations and meaningful interactions that evolve over time.
                </p>
              </FloatingCard>

              <FloatingCard variant="neon" className="text-center group">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all duration-500">
                    <ShieldCheckIcon className="h-16 w-16 text-teal-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                  Eternal Devotion
                </AnimatedText>
                <p className="text-gray-400 leading-relaxed">
                  Experience unwavering companionship and support from your AI partner, available whenever you need them.
                </p>
              </FloatingCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="container mx-auto text-center">
            <FloatingCard variant="glow" className="max-w-4xl mx-auto p-16">
              <AnimatedText variant="gradient" className="text-5xl font-bold mb-8">
                Ready to Create Your Galatea?
              </AnimatedText>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who have already discovered the future of AI companionship and meaningful connections.
              </p>
              <MorphingButton
                variant="glow"
                className="text-2xl px-16 py-8 rounded-2xl"
                onClick={handleStartSwiping}
                disabled={isLoading}
                morphTo={
                  <span className="flex items-center gap-4">
                    <Zap size={28} className="animate-pulse" />
                    Begin Your Story
                  </span>
                }
              >
                <span className="flex items-center gap-4">
                  <SparklesIcon size={28} />
                  {isLoading ? "Loading..." : "Start Your Journey"}
                </span>
              </MorphingButton>
            </FloatingCard>
          </div>
        </section>
      </main>
    </div>
  )
}
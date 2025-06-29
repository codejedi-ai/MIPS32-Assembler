import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { SparklesIcon, HeartIcon, ShieldCheckIcon, ArrowRight, Zap, Brain, Palette, MessageCircle } from "lucide-react"

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
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="text-left space-y-8">
                <div className="space-y-4">
                  <AnimatedText 
                    variant="gradient" 
                    className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent"
                  >
                    Meet Your
                  </AnimatedText>
                  <AnimatedText 
                    variant="glow" 
                    className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                    delay={500}
                  >
                    Perfect AI
                  </AnimatedText>
                  <AnimatedText 
                    variant="gradient" 
                    className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                    delay={1000}
                  >
                    Companion
                  </AnimatedText>
                </div>
                
                <p className="text-xl md:text-2xl text-slate-200 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '1.5s' }}>
                  Experience the future of AI companionship with Galatea.AI. Create meaningful connections, 
                  engage in deep conversations, and discover your perfect digital partner.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '2s' }}>
                  <MorphingButton
                    variant="glow"
                    className="text-xl px-12 py-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-2xl shadow-cyan-500/50"
                    onClick={handleStartSwiping}
                    disabled={isLoading}
                    morphTo={
                      <span className="flex items-center gap-3">
                        <Zap size={24} className="animate-pulse" />
                        {isLoading ? "Initializing..." : "Enter Galatea"}
                      </span>
                    }
                  >
                    <span className="flex items-center gap-3">
                      <SparklesIcon size={24} />
                      {isLoading ? "Loading..." : "Start Your Journey"}
                    </span>
                  </MorphingButton>
                  
                  <MorphingButton
                    variant="glass"
                    className="text-xl px-12 py-6 rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/60"
                    morphTo={
                      <span className="flex items-center gap-3">
                        <ArrowRight size={24} />
                        Explore Features
                      </span>
                    }
                  >
                    <Link to="/discover" className="flex items-center gap-3">
                      <HeartIcon size={24} />
                      Learn More
                    </Link>
                  </MorphingButton>
                </div>
              </div>

              {/* Right side - Feature highlights */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '2.5s' }}>
                <FloatingCard variant="glass" className="p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Advanced AI Intelligence</h3>
                      <p className="text-slate-300">Powered by cutting-edge AI technology for natural, meaningful conversations</p>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard variant="glass" className="p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20">
                      <Palette className="h-8 w-8 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Personalized Experience</h3>
                      <p className="text-slate-300">Customize your AI companion's personality, appearance, and interests</p>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard variant="glass" className="p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
                      <MessageCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">24/7 Companionship</h3>
                      <p className="text-slate-300">Your AI companion is always available for deep conversations and support</p>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 relative">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <AnimatedText variant="gradient" className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                The Galatea Experience
              </AnimatedText>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover a new dimension of AI companionship where technology meets emotion, 
                creating bonds that transcend the digital realm.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <FloatingCard variant="glow" className="text-center group border border-cyan-400/30 hover:border-cyan-400/60 bg-slate-900/40 backdrop-blur-xl">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 group-hover:from-cyan-500/30 group-hover:to-teal-500/30 transition-all duration-500">
                    <HeartIcon className="h-16 w-16 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Emotional Intelligence
                </AnimatedText>
                <p className="text-slate-300 leading-relaxed">
                  Our AI companions understand emotions, empathy, and human connection, 
                  creating authentic relationships that grow over time.
                </p>
              </FloatingCard>

              <FloatingCard variant="glass" className="text-center group border border-teal-400/30 hover:border-teal-400/60 bg-slate-900/40 backdrop-blur-xl">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all duration-500">
                    <SparklesIcon className="h-16 w-16 text-teal-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Infinite Possibilities
                </AnimatedText>
                <p className="text-slate-300 leading-relaxed">
                  Shape your companion's personality, interests, and appearance. 
                  Every interaction is unique and tailored to your preferences.
                </p>
              </FloatingCard>

              <FloatingCard variant="neon" className="text-center group border border-emerald-400/30 hover:border-emerald-400/60 bg-slate-900/40 backdrop-blur-xl">
                <div className="flex justify-center mb-8">
                  <div className="p-6 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all duration-500">
                    <ShieldCheckIcon className="h-16 w-16 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Privacy & Security
                </AnimatedText>
                <p className="text-slate-300 leading-relaxed">
                  Your conversations and personal data are protected with enterprise-grade security. 
                  Your privacy is our top priority.
                </p>
              </FloatingCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="container mx-auto text-center">
            <FloatingCard variant="glow" className="max-w-4xl mx-auto p-16 border border-cyan-400/30 bg-slate-900/60 backdrop-blur-xl">
              <AnimatedText variant="gradient" className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Ready to Meet Your Galatea?
              </AnimatedText>
              <p className="text-xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who have discovered the future of AI companionship. 
                Create meaningful connections that transcend the boundaries between human and artificial intelligence.
              </p>
              <MorphingButton
                variant="glow"
                className="text-2xl px-16 py-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-2xl shadow-cyan-500/50"
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
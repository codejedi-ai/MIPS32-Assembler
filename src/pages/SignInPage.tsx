import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react"

export function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <FloatingCard variant="glass" className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <AnimatedText variant="gradient" className="text-3xl font-bold mb-4">
              Welcome Back
            </AnimatedText>
            <p className="text-gray-400">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                <Lock size={16} />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <MorphingButton
              type="submit"
              variant="glow"
              className="w-full"
              disabled={isLoading}
              morphTo={
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={20} className="animate-pulse" />
                  {isLoading ? "Signing in..." : "Enter Dashboard"}
                </span>
              }
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                {isLoading ? "Signing in..." : "Sign In"}
              </span>
            </MorphingButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </FloatingCard>
    </div>
  )
}
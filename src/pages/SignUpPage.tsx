import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowRight, User, Mail, Lock } from "lucide-react"

export function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate account creation
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <FloatingCard variant="glow" className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <AnimatedText variant="gradient" className="text-3xl font-bold mb-4">
              Create Account
            </AnimatedText>
            <p className="text-gray-400">Join the future of AI companionship</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 flex items-center gap-2">
                <User size={16} />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300 flex items-center gap-2">
                <Lock size={16} />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
                  {isLoading ? "Creating..." : "Welcome Aboard!"}
                </span>
              }
            >
              <span className="flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                {isLoading ? "Creating..." : "Create Account"}
              </span>
            </MorphingButton>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </FloatingCard>
    </div>
  )
}
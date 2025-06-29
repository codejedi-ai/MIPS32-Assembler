"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "@/components/logo"
import { LoadingScreen } from "@/components/loading"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeartIcon, SparklesIcon, ShieldCheckIcon } from "lucide-react"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Creating your account...")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingMessage("Creating your account...")

    // Simulate account creation process
    setTimeout(() => {
      setLoadingMessage("Setting up your profile...")
    }, 1500)

    setTimeout(() => {
      setLoadingMessage("Almost done...")
    }, 3000)

    setTimeout(() => {
      navigate("/dashboard")
    }, 4500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen message={loadingMessage} />}

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%283%29-L6qSEYWopTwPkL5TezhXHGR9OFGqb0.png"
          alt="Galatea background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <Logo size="medium" />
      </div>

      {/* Sign Up Card */}
      <div className="auth-card rounded-xl w-full max-w-4xl mx-4 z-10 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Sign Up Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-galatea-light">Create Account</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-galatea-light/90">
                  Full Name
                </Label>
                <Input id="name" type="text" placeholder="Enter your full name" className="cyber-input" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-galatea-light/90">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" className="cyber-input" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-galatea-light/90">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="Create a password" className="cyber-input" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-galatea-light/90">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  className="cyber-input"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full cyber-button bg-galatea-teal text-galatea-black hover:bg-galatea-teal/90"
              >
                Create Account
              </Button>

              <div className="text-center mt-6">
                <p className="text-galatea-light/70">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-galatea-teal hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Divider for desktop */}
          <div className="hidden md:block auth-divider"></div>

          {/* Right Side - Benefits */}
          <div className="w-full md:w-1/2 p-8 border-t border-galatea-teal/20 md:border-t-0">
            <h2 className="text-2xl font-bold mb-6 text-galatea-light">Benefits</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="bg-teal-500/20 p-2 rounded-full">
                  <HeartIcon className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-galatea-light">Personalized Companions</h3>
                  <p className="text-galatea-light/70">
                    Create and customize AI companions tailored to your preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-teal-500/20 p-2 rounded-full">
                  <SparklesIcon className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-galatea-light">Advanced AI Technology</h3>
                  <p className="text-galatea-light/70">
                    Experience cutting-edge AI that learns and adapts to your interactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-teal-500/20 p-2 rounded-full">
                  <ShieldCheckIcon className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-galatea-light">Privacy & Security</h3>
                  <p className="text-galatea-light/70">
                    Your data is encrypted and protected with the highest security standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-galatea-light/50 text-sm">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-galatea-teal/70 hover:text-galatea-teal">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-galatea-teal/70 hover:text-galatea-teal">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="particles"></div>
    </div>
  )
}
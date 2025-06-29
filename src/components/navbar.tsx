"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Menu, X, Sparkles, LogIn } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/10" 
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/about" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/discover" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group">
            Discover
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/features" className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-3">
          <MorphingButton
            variant="glass"
            morphTo={
              <span className="flex items-center gap-2">
                <LogIn size={16} />
                Sign In
              </span>
            }
          >
            <Link to="/signin" className="flex items-center gap-2">
              <LogIn size={16} />
              Log In
            </Link>
          </MorphingButton>
          
          <MorphingButton
            variant="glow"
            morphTo={
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                Get Started
              </span>
            }
          >
            <Link to="/signup" className="flex items-center gap-2">
              <Sparkles size={16} />
              Sign Up
            </Link>
          </MorphingButton>
        </div>

        {/* Mobile Menu Button */}
        <MorphingButton
          variant="glass"
          className="md:hidden w-12 h-12 rounded-full p-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          morphTo={isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MorphingButton>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/30 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <Link
              to="/about"
              className="text-slate-300 hover:text-cyan-400 transition-all duration-300 py-3 border-b border-slate-800/50 hover:border-cyan-500/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AnimatedText variant="fade">About</AnimatedText>
            </Link>
            <Link
              to="/discover"
              className="text-slate-300 hover:text-cyan-400 transition-all duration-300 py-3 border-b border-slate-800/50 hover:border-cyan-500/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AnimatedText variant="fade" delay={100}>Discover</AnimatedText>
            </Link>
            <Link
              to="/features"
              className="text-slate-300 hover:text-cyan-400 transition-all duration-300 py-3 border-b border-slate-800/50 hover:border-cyan-500/30"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AnimatedText variant="fade" delay={200}>Features</AnimatedText>
            </Link>
            
            <div className="flex flex-col space-y-4 pt-4">
              <MorphingButton variant="glass" className="justify-center">
                <Link to="/signin" className="w-full text-center">Log In</Link>
              </MorphingButton>
              <MorphingButton variant="glow" className="justify-center">
                <Link to="/signup" className="w-full text-center">Sign Up</Link>
              </MorphingButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/technology" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Technology
          </Link>
          <Link to="/materials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Materials
          </Link>
          <Link to="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Testimonials
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
        </div>

        <div className="hidden md:flex space-x-3">
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
            <Link to="/order">Order Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              to="/technology"
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Technology
            </Link>
            <Link
              to="/materials"
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Materials
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 justify-start" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
                <Link to="/order">Order Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
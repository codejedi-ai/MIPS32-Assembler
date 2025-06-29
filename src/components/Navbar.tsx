import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 animate-pulse-glow" />
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-lg group-hover:bg-blue-700/30 transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              Secundus Dermis
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/product" 
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group font-medium"
            >
              Product
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/technology" 
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group font-medium"
            >
              Technology
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group font-medium"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group font-medium"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Button variant="premium" size="sm" className="sparkle-container">
              Shop Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-blue-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl shadow-xl">
              <Link
                to="/product"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Product
              </Link>
              <Link
                to="/technology"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Technology
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 py-3">
                <Button variant="premium" size="sm" className="w-full">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
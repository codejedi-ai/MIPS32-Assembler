import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Heart, 
  Droplets, 
  Wind,
  ArrowRight,
  Star,
  CheckCircle,
  Award,
  Users,
  Globe
} from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 snowflake-pattern relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-float delay-200"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-float delay-400"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Revolutionary Innovation
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Your Perfect
                <span className="gradient-text block sparkle-container">Second Skin</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Experience the revolutionary Secundus Dermis - an all-in-one base layer that seamlessly 
                integrates practicality, resilience, and elegance. More than clothing, it's your second skin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Button size="xl" variant="premium" className="group">
                  Discover the Innovation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" size="xl" asChild className="group">
                  <Link to="/technology">
                    Learn Technology
                    <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center space-x-3 group">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors">10,000+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">Award Winning</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl transform rotate-6 opacity-20 animate-pulse-glow"></div>
                <Card variant="luxury" className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                  <CardContent className="p-0">
                    <img 
                      src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=700&fit=crop&crop=center"
                      alt="Secundus Dermis Base Layer"
                      className="w-full h-[500px] object-cover rounded-3xl"
                    />
                    <div className="absolute top-6 right-6 glass-effect px-4 py-2 rounded-full">
                      <span className="text-sm font-bold gradient-text">Silver-Infused</span>
                    </div>
                    <div className="absolute bottom-6 left-6 glass-effect px-6 py-3 rounded-2xl">
                      <span className="text-lg font-bold text-gray-900">Premium Quality</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200 mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Revolutionary Features
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 sparkle-container">
              Multi-Functional Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Secundus Dermis isn't just an undergarment - it's a complete solution that adapts to your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <Card variant="gradient" className="text-center group hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/25">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors">All-in-One Support</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Functions as a bra, layering tee, and emergency undergarment without compromising elegance or comfort.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card variant="gradient" className="text-center group hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">Antimicrobial Protection</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Silver-infused threads neutralize bacteria and eliminate odors, ensuring freshness for extended wear.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card variant="gradient" className="text-center group hover:scale-105 transition-all duration-500">
              <CardContent className="p-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-green-600 transition-colors">Adaptive Design</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Seamlessly transitions from casual to professional to ceremonial attire with sophisticated versatility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 lace-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Materials
              </span>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 sparkle-container">
                Crafted with Excellence
              </h2>
              <div className="space-y-8">
                <Card variant="glass" className="p-8 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/25">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Silver-Infused Silk</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Luxurious, breathable texture with natural antibacterial properties that maintain freshness.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="glass" className="p-8 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                      <Droplets className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Egyptian Cotton</h3>
                      <p className="text-gray-600 leading-relaxed">
                        High-thread count cotton provides durability, moisture-wicking, and soft-touch comfort.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="glass" className="p-8 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
                      <Wind className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Elastic Fiber Blends</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Form-fitting flexibility that hugs your body without restricting movement or comfort.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl transform -rotate-6 opacity-40 animate-pulse-glow"></div>
              <Card variant="luxury" className="relative transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <CardContent className="p-0">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop&crop=center"
                    alt="Premium fabric close-up"
                    className="w-full h-96 object-cover rounded-3xl"
                  />
                  <div className="absolute bottom-8 left-8 glass-effect px-6 py-3 rounded-2xl">
                    <span className="text-lg font-bold gradient-text">Snowflake-Inspired Patterns</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 mb-8">
            <Users className="w-4 h-4 mr-2" />
            Customer Stories
          </span>
          
          <Card variant="luxury" className="p-16 animate-fade-in">
            <div className="mb-10">
              <div className="relative inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face"
                  alt="Mekkana"
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mekkana</h3>
              <p className="text-blue-600 font-semibold">Innovation Pioneer</p>
            </div>
            
            <blockquote className="text-2xl lg:text-3xl text-gray-700 italic mb-10 leading-relaxed font-light">
              "The Secundus Dermis isn't just clothing—it's a declaration of ingenuity and independence. 
              After 3 weeks of continuous wear, it still feels fresh and looks pristine. It's become an 
              extension of my identity."
            </blockquote>
            
            <div className="flex justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-500 fill-current" />
              ))}
            </div>
            
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Verified Purchase
              </span>
              <span className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                3 Weeks Tested
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float delay-500"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 sparkle-container">
            Experience Your Second Skin
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the revolution in base layer technology. Discover what it means to wear true innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="xl" variant="luxury" className="group text-xl px-12 py-6">
              Shop Secundus Dermis
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 text-xl px-12 py-6" asChild>
              <Link to="/product">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
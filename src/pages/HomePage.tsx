import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Heart, 
  Droplets, 
  Wind,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 snowflake-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Your Perfect
                <span className="gradient-text block">Second Skin</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the revolutionary Secundus Dermis - an all-in-one base layer that seamlessly 
                integrates practicality, resilience, and elegance. More than clothing, it's your second skin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Discover the Innovation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/technology">Learn Technology</Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12 flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">10,000+ Happy Customers</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl fabric-texture">
                  <img 
                    src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=600&fit=crop&crop=center"
                    alt="Secundus Dermis Base Layer"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Silver-Infused
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary Multi-Functionality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Secundus Dermis isn't just an undergarment - it's a complete solution that adapts to your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover-lift">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">All-in-One Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Functions as a bra, layering tee, and emergency undergarment without compromising elegance or comfort.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover-lift">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Antimicrobial Protection</h3>
              <p className="text-gray-600 leading-relaxed">
                Silver-infused threads neutralize bacteria and eliminate odors, ensuring freshness for extended wear.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover-lift">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly transitions from casual to professional to ceremonial attire with sophisticated versatility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-gray-50 lace-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Premium Materials & Craftsmanship
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-silver-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Silver-Infused Silk</h3>
                    <p className="text-gray-600">
                      Luxurious, breathable texture with natural antibacterial properties that maintain freshness.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Egyptian Cotton</h3>
                    <p className="text-gray-600">
                      High-thread count cotton provides durability, moisture-wicking, and soft-touch comfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wind className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Elastic Fiber Blends</h3>
                    <p className="text-gray-600">
                      Form-fitting flexibility that hugs your body without restricting movement or comfort.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-silver-200 to-blue-200 rounded-3xl transform -rotate-6 opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center"
                  alt="Premium fabric close-up"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Snowflake-Inspired Patterns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                alt="Mekkana"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold text-gray-900">Mekkana</h3>
              <p className="text-gray-600">Innovation Pioneer</p>
            </div>
            <blockquote className="text-2xl text-gray-700 italic mb-8 leading-relaxed">
              "The Secundus Dermis isn't just clothing—it's a declaration of ingenuity and independence. 
              After 3 weeks of continuous wear, it still feels fresh and looks pristine. It's become an 
              extension of my identity."
            </blockquote>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Your Second Skin
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the revolution in base layer technology. Discover what it means to wear true innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Shop Secundus Dermis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/product">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
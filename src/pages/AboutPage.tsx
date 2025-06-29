import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { 
  Target, 
  Users, 
  Award, 
  Globe,
  Heart,
  Lightbulb,
  ArrowRight
} from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="gradient-text block">Secundus Dermis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing intimate apparel through innovative technology and thoughtful design, 
            creating garments that truly become your second skin.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                To redefine what an underlayer can achieve by seamlessly integrating practicality, 
                resilience, and elegance into a single revolutionary garment.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Lightbulb className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation First</h3>
                    <p className="text-gray-600">
                      We push the boundaries of textile technology to create solutions that didn't exist before.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Comfort & Confidence</h3>
                    <p className="text-gray-600">
                      Every design decision prioritizes the wearer's comfort, confidence, and empowerment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Globe className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable Future</h3>
                    <p className="text-gray-600">
                      We're committed to creating durable, long-lasting garments that reduce environmental impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=600&fit=crop&crop=center"
                alt="Innovation and design process"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">Born from necessity, perfected through innovation</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                The Secundus Dermis was born from a simple observation: traditional undergarments force 
                compromises. You choose between support and comfort, between functionality and elegance, 
                between practicality and style. We refused to accept these limitations.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our team of textile engineers, fashion designers, and materials scientists spent three years 
                developing the perfect fusion of silver-infused silk, Egyptian cotton, and elastic fiber blends. 
                The result is a garment that doesn't just meet multiple needs—it exceeds them.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, the Secundus Dermis represents more than innovative clothing. It's a symbol of 
                independence, ingenuity, and the refusal to compromise on what you deserve. It's your second skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously pushing boundaries to create solutions that transform lives.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                Uncompromising quality in every thread, seam, and design decision.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Empowerment</h3>
              <p className="text-gray-600">
                Creating garments that enhance confidence and support individual expression.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Care</h3>
              <p className="text-gray-600">
                Thoughtful consideration for comfort, health, and environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The innovators behind Secundus Dermis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                alt="Dr. Sarah Chen"
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Chen</h3>
              <p className="text-blue-600 font-medium mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Materials scientist with 15 years experience in advanced textile engineering and nanotechnology.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Marcus Rodriguez"
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Marcus Rodriguez</h3>
              <p className="text-blue-600 font-medium mb-4">Head of Design</p>
              <p className="text-gray-600 text-sm">
                Fashion designer specializing in functional elegance and sustainable luxury garments.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                alt="Dr. Emily Watson"
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Emily Watson</h3>
              <p className="text-blue-600 font-medium mb-4">Research Director</p>
              <p className="text-gray-600 text-sm">
                Biochemist focused on antimicrobial technologies and skin-safe material development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the future of intimate apparel with Secundus Dermis.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Discover Your Second Skin
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Button } from '../components/ui/button'
import { 
  Shield, 
  Sparkles, 
  Droplets, 
  Wind, 
  Scissors,
  RefreshCw,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react'

export function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Secundus Dermis
                <span className="gradient-text block">Complete Specifications</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover every detail of the revolutionary all-in-one base layer that's redefining intimate apparel.
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">Certified Antimicrobial</span>
                </div>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Order Now - $149
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=700&fit=crop&crop=center"
                alt="Secundus Dermis Product"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Functions</h2>
            <p className="text-xl text-gray-600">Three essential functions in one revolutionary garment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 hover-lift">
              <Heart className="h-12 w-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-functional Undergarment</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Seamless bra support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sophisticated layering tee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Emergency undergarment capability</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover-lift">
              <RefreshCw className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultimate Adaptability</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Casual wear compatibility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Professional attire ready</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Ceremonial elegance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover-lift">
              <Shield className="h-12 w-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hygienic Durability</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Silver-thread antimicrobial protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Odor neutralization technology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Extended wear capability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Materials & Features</h2>
            <p className="text-xl text-gray-600">Premium components for unmatched performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Material Composition */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Material Composition</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-silver-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Silver-Infused Silk</h4>
                    <p className="text-gray-600">
                      Provides antibacterial properties while maintaining luxurious, breathable texture for all-day comfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">High-Thread Count Egyptian Cotton</h4>
                    <p className="text-gray-600">
                      Adds durability, moisture-wicking capability, and a soft-touch finish that improves with wear.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wind className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Elastic Fiber Blends</h4>
                    <p className="text-gray-600">
                      Ensures form-fitting flexibility that hugs the body without restricting movement or circulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Design Details</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Lace-Trimming</h4>
                  <p className="text-gray-600">
                    Sophisticated and functional, with certain sections designed for easy tearing in emergencies 
                    while maintaining overall elegance.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Snowflake-Inspired Patterns</h4>
                  <p className="text-gray-600">
                    Subtle, shimmering designs add a touch of elegance and individuality while maintaining 
                    professional appearance.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Flatlock Seams</h4>
                  <p className="text-gray-600">
                    Prevent chafing and ensure ultimate comfort during extended wear, even during physical activity.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick-Dry Technology</h4>
                  <p className="text-gray-600">
                    Keeps the fabric dry and breathable in any situation, from office environments to outdoor activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resilience Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resilience & Durability</h2>
            <p className="text-xl text-gray-600">Built to last, designed to adapt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Scissors className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tear-Away Sections</h3>
                    <p className="text-gray-600">
                      Strategic sections allow for repurposing fabric in emergency scenarios while maintaining 
                      the garment's integrity and elegance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stain-Resistant Technology</h3>
                    <p className="text-gray-600">
                      Advanced fabric treatment ensures easy cleaning and maintains the pristine white appearance 
                      even after extended use.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Self-Maintaining Properties</h3>
                    <p className="text-gray-600">
                      The silver-infused fibers continuously work to maintain freshness and cleanliness, 
                      reducing the need for frequent washing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop&crop=center"
                alt="Fabric resilience demonstration"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h2>
            <p className="text-xl text-gray-600">Find your perfect fit</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Size</th>
                    <th className="px-6 py-4 text-left">Bust (inches)</th>
                    <th className="px-6 py-4 text-left">Waist (inches)</th>
                    <th className="px-6 py-4 text-left">Hip (inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">XS</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">24-26</td>
                    <td className="px-6 py-4">34-36</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">S</td>
                    <td className="px-6 py-4">32-34</td>
                    <td className="px-6 py-4">26-28</td>
                    <td className="px-6 py-4">36-38</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">M</td>
                    <td className="px-6 py-4">34-36</td>
                    <td className="px-6 py-4">28-30</td>
                    <td className="px-6 py-4">38-40</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">L</td>
                    <td className="px-6 py-4">36-38</td>
                    <td className="px-6 py-4">30-32</td>
                    <td className="px-6 py-4">40-42</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">XL</td>
                    <td className="px-6 py-4">38-40</td>
                    <td className="px-6 py-4">32-34</td>
                    <td className="px-6 py-4">42-44</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Your Second Skin?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who have discovered the future of base layer technology.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Order Secundus Dermis - $149
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
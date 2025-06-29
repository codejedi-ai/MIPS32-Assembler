import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { 
  Atom, 
  Shield, 
  Droplets, 
  Wind, 
  Zap,
  Microscope,
  Sparkles,
  RefreshCw
} from 'lucide-react'

export function TechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionary
            <span className="gradient-text block">Technology</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the cutting-edge science and innovation behind the Secundus Dermis - 
            where advanced materials meet intelligent design.
          </p>
        </div>
      </section>

      {/* Silver Technology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Atom className="h-8 w-8 text-silver-500" />
                <h2 className="text-4xl font-bold text-gray-900">Silver-Infused Technology</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Our proprietary silver-infusion process embeds pure silver nanoparticles directly into 
                the fabric fibers, creating a permanent antimicrobial barrier.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Antimicrobial Protection</h3>
                    <p className="text-gray-600">
                      Silver ions naturally eliminate 99.9% of bacteria, fungi, and odor-causing microorganisms 
                      on contact, providing continuous protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <RefreshCw className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Regenerating</h3>
                    <p className="text-gray-600">
                      The silver particles continuously release ions, ensuring long-lasting antimicrobial 
                      effectiveness that doesn't diminish with washing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Sparkles className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Skin-Safe Formula</h3>
                    <p className="text-gray-600">
                      Our silver infusion is completely safe for skin contact and hypoallergenic, 
                      suitable for even the most sensitive skin types.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-silver-200 to-blue-200 rounded-3xl transform rotate-6 opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=400&fit=crop&crop=center"
                  alt="Silver nanoparticles under microscope"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Silver Nanoparticles (1000x magnification)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Engineering */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Fabric Engineering</h2>
            <p className="text-xl text-gray-600">Three premium materials working in perfect harmony</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Silk Technology */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Silver-Infused Silk</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Natural protein fibers for ultimate comfort</li>
                <li>• Temperature regulation properties</li>
                <li>• Hypoallergenic and breathable</li>
                <li>• Luxurious feel against skin</li>
                <li>• Natural moisture-wicking</li>
              </ul>
            </div>

            {/* Cotton Technology */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-6">
                <Droplets className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Egyptian Cotton</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Extra-long staple fibers for durability</li>
                <li>• Superior moisture absorption</li>
                <li>• Softens with each wash</li>
                <li>• High thread count construction</li>
                <li>• Exceptional tensile strength</li>
              </ul>
            </div>

            {/* Elastic Technology */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Wind className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Elastic Fiber Blends</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• 4-way stretch technology</li>
                <li>• Shape retention properties</li>
                <li>• Enhanced recovery after stretching</li>
                <li>• Compression without restriction</li>
                <li>• Long-lasting elasticity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Dry Technology */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=400&fit=crop&crop=center"
                alt="Moisture-wicking technology demonstration"
                className="w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="h-8 w-8 text-blue-500" />
                <h2 className="text-4xl font-bold text-gray-900">Quick-Dry Technology</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Our advanced moisture management system keeps you dry and comfortable in any environment.
              </p>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Capillary Action Wicking</h3>
                  <p className="text-gray-600">
                    Specialized fiber structure pulls moisture away from skin through capillary action, 
                    distributing it across the fabric surface for rapid evaporation.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Breathable Microstructure</h3>
                  <p className="text-gray-600">
                    Engineered air channels within the fabric allow continuous airflow while maintaining 
                    the garment's structural integrity and appearance.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Temperature Regulation</h3>
                  <p className="text-gray-600">
                    Smart fibers adapt to body temperature changes, providing cooling when warm and 
                    insulation when cool for optimal comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flatlock Seam Technology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flatlock Seam Technology</h2>
            <p className="text-xl text-gray-600">Engineered for comfort and durability</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Precision Construction</h3>
              <p className="text-gray-600 text-sm">
                Each seam is precisely engineered to lie completely flat against the skin
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chafe Prevention</h3>
              <p className="text-gray-600 text-sm">
                Eliminates friction and irritation during extended wear and movement
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Durability</h3>
              <p className="text-gray-600 text-sm">
                Stronger than traditional seams while maintaining flexibility
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wind className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Invisible Profile</h3>
              <p className="text-gray-600 text-sm">
                Seamless appearance under any clothing for professional elegance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing & Certification */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Testing & Certification</h2>
            <p className="text-xl text-gray-600">Rigorously tested for safety and performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Antimicrobial Efficacy</h3>
              <p className="text-gray-600 mb-4">
                Tested against 50+ bacterial and fungal strains with 99.9% elimination rate
              </p>
              <div className="text-sm text-blue-600 font-medium">ISO 20743 Certified</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Moisture Management</h3>
              <p className="text-gray-600 mb-4">
                Superior wicking performance tested under extreme conditions
              </p>
              <div className="text-sm text-green-600 font-medium">AATCC 195 Compliant</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Skin Safety</h3>
              <p className="text-gray-600 mb-4">
                Dermatologically tested and approved for sensitive skin
              </p>
              <div className="text-sm text-purple-600 font-medium">OEKO-TEX Standard 100</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
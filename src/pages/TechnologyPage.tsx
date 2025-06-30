import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeatureCard } from "@/components/feature-card"
import { Shield, Zap, Layers, Droplets, Wind, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revolutionary Technology
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the cutting-edge innovations that make the Secundus Dermis the most advanced base layer ever created.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Technology Features */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Shield className="h-12 w-12" />}
                title="Antimicrobial Protection"
                description="Silver-infused fibers actively neutralize bacteria and eliminate odor, keeping you fresh for extended periods."
                delay={0.1}
              />
              <FeatureCard
                icon={<Droplets className="h-12 w-12" />}
                title="Moisture Management"
                description="Advanced moisture-wicking technology keeps you dry and comfortable in any environment."
                delay={0.2}
              />
              <FeatureCard
                icon={<Wind className="h-12 w-12" />}
                title="Breathable Design"
                description="Engineered airflow channels provide optimal ventilation while maintaining insulation."
                delay={0.3}
              />
              <FeatureCard
                icon={<Layers className="h-12 w-12" />}
                title="Adaptive Layering"
                description="Intelligent fabric responds to temperature changes, providing comfort in any climate."
                delay={0.4}
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12" />}
                title="Quick-Dry Technology"
                description="Rapid moisture evaporation ensures the garment dries quickly and stays comfortable."
                delay={0.5}
              />
              <FeatureCard
                icon={<Sparkles className="h-12 w-12" />}
                title="Self-Cleaning Properties"
                description="Advanced fiber technology helps the garment maintain cleanliness with minimal care."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Detailed Technology Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  The Science Behind <span className="text-blue-600">Innovation</span>
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Silver Nanotechnology</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our proprietary silver nanoparticle integration creates a permanent antimicrobial barrier that doesn't wash out. 
                      These microscopic silver particles actively destroy bacteria and fungi on contact, ensuring lasting freshness.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Adaptive Fiber Matrix</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The unique blend of natural and synthetic fibers creates a responsive fabric that adapts to your body's needs. 
                      The matrix expands and contracts based on temperature and humidity, providing optimal comfort in any condition.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Intelligent Construction</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Flatlock seams and strategic panel placement eliminate pressure points and chafing. 
                      The garment's construction allows for emergency tear-away sections while maintaining structural integrity.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg"
                    alt="Technology Innovation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
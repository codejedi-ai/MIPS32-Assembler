import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Sparkles, Droplets, Wind, Shield, Star, Layers } from "lucide-react"

export default function MaterialsPage() {
  const materials = [
    {
      name: "Silver-Infused Silk",
      icon: <Sparkles className="h-8 w-8" />,
      description: "Luxurious silk threads infused with silver nanoparticles for natural antimicrobial properties.",
      benefits: ["Antibacterial protection", "Luxurious feel", "Natural temperature regulation", "Hypoallergenic"],
      image: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg"
    },
    {
      name: "Egyptian Cotton",
      icon: <Droplets className="h-8 w-8" />,
      description: "Premium high-thread count Egyptian cotton for superior durability and moisture management.",
      benefits: ["Exceptional durability", "Moisture-wicking", "Soft texture", "Breathable"],
      image: "https://images.pexels.com/photos/4210860/pexels-photo-4210860.jpeg"
    },
    {
      name: "Elastic Fiber Blend",
      icon: <Wind className="h-8 w-8" />,
      description: "Advanced elastic fibers that provide perfect fit and freedom of movement.",
      benefits: ["4-way stretch", "Shape retention", "Compression support", "Flexibility"],
      image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg"
    }
  ]

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
                Premium Materials
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every fiber in the Secundus Dermis is carefully selected and engineered for maximum performance, comfort, and durability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="space-y-24">
              {materials.map((material, index) => (
                <motion.div
                  key={material.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        {material.icon}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">{material.name}</h2>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {material.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {material.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Star className="h-5 w-5 text-blue-600 fill-current" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={material.image}
                        alt={material.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Design <span className="text-blue-600">Details</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every detail is meticulously crafted for both beauty and function
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
              >
                <Layers className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Lace Trimming</h3>
                <p className="text-gray-600">Sophisticated lace details with strategic tear-away sections for emergency use while maintaining elegance.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl"
              >
                <Sparkles className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Snowflake Patterns</h3>
                <p className="text-gray-600">Subtle, shimmering snowflake-inspired designs that add elegance and individuality to every piece.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl"
              >
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Flatlock Seams</h3>
                <p className="text-gray-600">Advanced seam construction prevents chafing and ensures ultimate comfort during extended wear.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
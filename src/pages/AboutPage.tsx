import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Target, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
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
                About Secundus Dermis
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're revolutionizing the future of clothing with intelligent design that adapts to your lifestyle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Our <span className="text-blue-600">Mission</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Secundus Dermis, we believe clothing should be more than just fabric. It should be intelligent, 
                  adaptive, and empowering. Our mission is to create garments that enhance your life through innovative 
                  technology and thoughtful design.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We're not just making clothes; we're crafting a second skin that understands your needs, 
                  adapts to your environment, and supports your lifestyle with uncompromising elegance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg"
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our <span className="text-blue-600">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Target className="h-12 w-12" />,
                  title: "Innovation",
                  description: "Pushing the boundaries of what clothing can achieve through cutting-edge technology."
                },
                {
                  icon: <Users className="h-12 w-12" />,
                  title: "Empowerment",
                  description: "Creating garments that enhance confidence and support individual expression."
                },
                {
                  icon: <Award className="h-12 w-12" />,
                  title: "Quality",
                  description: "Using only the finest materials and craftsmanship in every piece we create."
                },
                {
                  icon: <Globe className="h-12 w-12" />,
                  title: "Sustainability",
                  description: "Designing for longevity and minimal environmental impact through intelligent materials."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-800">
                  The <span className="text-blue-600">Story</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none text-gray-600"
              >
                <p className="text-lg leading-relaxed mb-6">
                  The Secundus Dermis was born from a simple observation: traditional clothing forces us to choose 
                  between function and form, between comfort and style, between practicality and elegance. 
                  We refused to accept these compromises.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Our team of materials scientists, fashion designers, and technology innovators spent years 
                  developing a garment that could truly be called a "second skin." We integrated silver nanotechnology 
                  for antimicrobial properties, engineered adaptive fibers for ultimate comfort, and crafted elegant 
                  designs that make a statement.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  The result is more than just clothing—it's a declaration of independence from the limitations 
                  of traditional garments. It's a piece that empowers you to live your life without compromise, 
                  whether you're in a boardroom, on an adventure, or facing an unexpected challenge.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Today, thousands of people around the world have made the Secundus Dermis part of their daily lives, 
                  experiencing the freedom that comes from truly intelligent clothing. We're just getting started.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
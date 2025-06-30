import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Mekkana",
      role: "Innovation Enthusiast",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg",
      rating: 5,
      text: "The Secundus Dermis isn't just clothing—it's a declaration of my ingenuity and independence. After 3 weeks of continuous wear, it still feels fresh and looks elegant. This garment has revolutionized my approach to fashion and functionality.",
      highlight: "3 weeks continuous wear"
    },
    {
      name: "Dr. Sarah Chen",
      role: "Materials Scientist",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
      rating: 5,
      text: "From a scientific perspective, the silver nanotechnology integration is remarkable. The antimicrobial properties are genuine and long-lasting. I've tested this extensively in my lab, and the results are consistently impressive.",
      highlight: "Scientifically proven"
    },
    {
      name: "Alex Rivera",
      role: "Professional Athlete",
      image: "https://images.pexels.com/photos/3785081/pexels-photo-3785081.jpeg",
      rating: 5,
      text: "As someone who pushes their body to the limits, I need gear that can keep up. The Secundus Dermis provides unmatched comfort and performance. The moisture-wicking and odor control are game-changers for my training regimen.",
      highlight: "Performance tested"
    },
    {
      name: "Emma Thompson",
      role: "Fashion Designer",
      image: "https://images.pexels.com/photos/3785083/pexels-photo-3785083.jpeg",
      rating: 5,
      text: "The elegance of this piece is unmatched. It seamlessly transitions from undergarment to statement piece. The lace details and snowflake patterns show incredible attention to aesthetic detail while maintaining functionality.",
      highlight: "Design excellence"
    },
    {
      name: "Marcus Johnson",
      role: "Travel Blogger",
      image: "https://images.pexels.com/photos/3785085/pexels-photo-3785085.jpeg",
      rating: 5,
      text: "I've worn the Secundus Dermis through 15 countries and every climate imaginable. It's been my constant companion, adapting to each environment perfectly. The versatility is unmatched for frequent travelers.",
      highlight: "15 countries tested"
    },
    {
      name: "Dr. Lisa Park",
      role: "Dermatologist",
      image: "https://images.pexels.com/photos/3785087/pexels-photo-3785087.jpeg",
      rating: 5,
      text: "I recommend the Secundus Dermis to patients with sensitive skin. The hypoallergenic properties and antimicrobial benefits make it ideal for those who struggle with traditional fabrics. It's medically sound innovation.",
      highlight: "Dermatologist approved"
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
                Real Stories
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how the Secundus Dermis has transformed the lives of our customers across different industries and lifestyles.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16"></div>
              <Quote className="h-16 w-16 text-blue-200 mb-8" />
              
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl font-light text-gray-700 italic mb-6">
                    "{testimonials[0].text}"
                  </blockquote>
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    {testimonials[0].highlight}
                  </div>
                </div>
                
                <div className="text-center lg:text-left">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{testimonials[0].name}</h3>
                  <p className="text-gray-600">{testimonials[0].role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(1).map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mb-6">
                    {testimonial.highlight}
                  </div>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
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
                Trusted by <span className="text-blue-600">Thousands</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Happy Customers" },
                { number: "99.8%", label: "Satisfaction Rate" },
                { number: "50+", label: "Countries Shipped" },
                { number: "4.9/5", label: "Average Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
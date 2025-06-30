"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Sparkles, Layers, Droplets, Wind, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/navbar"
import { FeatureCard } from "@/components/feature-card"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Your Revolutionary <span className="text-gray-800">Second Skin</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed"
                >
                  The Secundus Dermis is a revolutionary all-in-one base layer that integrates practicality, resilience, and elegance. Experience the future of intelligent clothing.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="/order">Order Now</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full"
                    asChild
                  >
                    <Link to="/technology">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg"
                    alt="Secundus Dermis - Revolutionary Base Layer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating feature badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg"
                >
                  <Shield className="h-8 w-8 text-blue-600" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg"
                >
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Functions Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Core <span className="text-blue-600">Functions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how the Secundus Dermis revolutionizes your wardrobe with its multi-functional design
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Layers className="h-12 w-12" />}
                title="Multi-Functional Design"
                description="Acts as a bra, layering tee, and emergency undergarment all in one elegant piece. No compromises on style or functionality."
                delay={0.1}
              />
              <FeatureCard
                icon={<Wind className="h-12 w-12" />}
                title="Ultimate Adaptability"
                description="Perfect for casual, professional, or ceremonial attire. Concealable yet stylish enough to showcase openly."
                delay={0.2}
              />
              <FeatureCard
                icon={<Shield className="h-12 w-12" />}
                title="Hygienic Durability"
                description="Silver-infused threads provide antimicrobial properties, eliminating odor even after extended wear."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Premium <span className="text-blue-600">Materials</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Silver-Infused Silk</h3>
                      <p className="text-gray-600">Antibacterial properties with luxurious, breathable texture for ultimate comfort.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Droplets className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Egyptian Cotton</h3>
                      <p className="text-gray-600">High-thread count for durability, moisture-wicking, and soft-touch finish.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Wind className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Elastic Fiber Blends</h3>
                      <p className="text-gray-600">Form-fitting flexibility that moves with your body without restriction.</p>
                    </div>
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
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg"
                    alt="Premium Materials"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-light text-gray-700 italic mb-8">
                  "The Secundus Dermis isn't just clothing—it's a declaration of ingenuity and independence. 
                  After 3 weeks of continuous wear, it still feels fresh and looks elegant."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
                    alt="Mekkana"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Mekkana</p>
                    <p className="text-gray-600">Innovation Enthusiast</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Ready to Experience Your <span className="text-blue-200">Second Skin</span>?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Join the revolution in intelligent clothing. Experience the perfect blend of luxury, technology, and functionality.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-xl py-6 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/order">Order Your Secundus Dermis</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
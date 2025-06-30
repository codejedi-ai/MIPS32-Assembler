import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Shield, Truck, RotateCcw } from "lucide-react"

export default function OrderPage() {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "Pure White", value: "white", hex: "#FFFFFF" },
    { name: "Soft Ivory", value: "ivory", hex: "#F5F5DC" },
    { name: "Pearl Gray", value: "gray", hex: "#E5E5E5" }
  ]

  const features = [
    "Silver-infused antimicrobial protection",
    "Multi-functional design (bra, tee, emergency wear)",
    "Premium Egyptian cotton blend",
    "Moisture-wicking technology",
    "Flatlock seams for comfort",
    "Elegant lace trimming",
    "Snowflake-inspired patterns",
    "Quick-dry technology"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Order Your Secundus Dermis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the revolutionary second skin that combines luxury, technology, and functionality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg"
                  alt="Secundus Dermis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Secundus Dermis</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600">$299</span>
                    <span className="text-lg text-gray-500 line-through">$399</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">25% OFF</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Size Selection */}
                  <div>
                    <Label className="text-base font-medium text-gray-800 mb-3 block">Size</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-4 border rounded-lg font-medium transition-all ${
                            selectedSize === size
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <Label className="text-base font-medium text-gray-800 mb-3 block">Color</Label>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setSelectedColor(color.value)}
                          className={`w-full flex items-center space-x-3 p-3 border rounded-lg transition-all ${
                            selectedColor === color.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span className="font-medium">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label className="text-base font-medium text-gray-800 mb-3 block">Quantity</Label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <Label className="text-base font-medium text-gray-800 mb-3 block">What's Included</Label>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Button */}
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 text-lg font-medium"
                    disabled={!selectedSize || !selectedColor}
                  >
                    Add to Cart - ${299 * quantity}
                  </Button>

                  {/* Guarantees */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600">30-Day Guarantee</span>
                    </div>
                    <div className="text-center">
                      <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600">Free Shipping</span>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-xs text-gray-600">Easy Returns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
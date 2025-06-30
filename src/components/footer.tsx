import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Secundus Dermis</h3>
            <p className="text-gray-600">
              Revolutionary all-in-one base layer that redefines what an underlayer can achieve.
            </p>
            <div className="flex space-x-4">
              <div className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Mail size={20} />
              </div>
              <div className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Phone size={20} />
              </div>
              <div className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <MapPin size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/technology" className="text-gray-600 hover:text-blue-600">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-gray-600 hover:text-blue-600">
                  Materials
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-blue-600">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-blue-600">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2024 Secundus Dermis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
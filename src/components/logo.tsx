import { Link } from "react-router-dom"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
  className?: string
}

export function Logo({ size = "medium", showText = true, className = "" }: LogoProps) {
  const sizes = {
    small: 30,
    medium: 40,
    large: 120,
  }

  const dimension = sizes[size]

  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">SD</span>
        </div>
      </div>
      {showText && (
        <span
          className={`font-bold text-gray-800 ${size === "large" ? "text-3xl" : size === "small" ? "text-lg" : "text-xl"}`}
        >
          Secundus<span className="text-blue-600"> Dermis</span>
        </span>
      )}
    </Link>
  )
}
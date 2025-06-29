import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "glow" | "gradient" | "neon"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-900/50 border border-gray-800 backdrop-blur-sm",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl",
    glow: "bg-gray-900/80 border border-teal-500/50 shadow-2xl shadow-teal-500/20",
    gradient: "bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 backdrop-blur-sm",
    neon: "bg-black/80 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur-sm"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-1",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
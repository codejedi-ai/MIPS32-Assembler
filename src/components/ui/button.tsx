import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        outline: "border-2 border-blue-200 bg-transparent text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105 active:scale-95",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 transform hover:scale-105 active:scale-95",
        silver: "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 shadow-lg hover:shadow-xl hover:shadow-gray-500/25 transform hover:scale-105 hover:-translate-y-1 active:scale-95",
        premium: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 hover:-translate-y-2 active:scale-95 animate-gradient-shift",
        luxury: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-gray-900 shadow-2xl hover:shadow-amber-500/25 transform hover:scale-110 hover:-translate-y-2 active:scale-95 font-bold",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base font-semibold",
        icon: "h-12 w-12",
        xl: "h-16 rounded-2xl px-12 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 active:scale-95",
        destructive: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-400 hover:to-pink-400 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 active:scale-95",
        outline: "border-2 border-cyan-500/30 bg-transparent text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transform hover:scale-105 active:scale-95",
        secondary: "bg-slate-800/50 text-slate-200 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95",
        ghost: "text-slate-300 hover:bg-white/10 hover:text-white backdrop-blur-sm transform hover:scale-105 active:scale-95",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300 transform hover:scale-105 active:scale-95",
        glow: "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-110 active:scale-95 animate-pulse-glow",
        glass: "bg-white/10 backdrop-blur-md border border-cyan-400/20 text-white hover:bg-white/20 hover:border-cyan-400/40 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "h-12 w-12",
        xl: "h-16 rounded-2xl px-10 text-lg",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
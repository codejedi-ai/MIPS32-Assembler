import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <div className="relative group">
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border-2 border-gray-700/50 bg-gray-900/50 backdrop-blur-sm px-4 py-3 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:border-teal-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/50 shadow-lg focus:shadow-xl focus:shadow-teal-500/20 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
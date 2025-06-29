import React from 'react'
import { cn } from '@/lib/utils'

interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'glow' | 'neon' | 'glass'
  hover?: boolean
}

export function FloatingCard({ 
  children, 
  className, 
  variant = 'default', 
  hover = true,
  ...props 
}: FloatingCardProps) {
  const variants = {
    default: 'bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm',
    glow: 'bg-gray-900/80 border border-teal-500/50 shadow-2xl shadow-teal-500/20',
    neon: 'bg-black/80 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl'
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-500 transform',
        variants[variant],
        hover && 'hover:scale-105 hover:-translate-y-2 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
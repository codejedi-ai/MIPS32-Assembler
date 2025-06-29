import React from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'gradient' | 'glow' | 'typewriter' | 'fade'
  delay?: number
}

export function AnimatedText({ 
  children, 
  className, 
  variant = 'gradient',
  delay = 0 
}: AnimatedTextProps) {
  const variants = {
    gradient: 'bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x',
    glow: 'text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-teal-glow',
    typewriter: 'text-white overflow-hidden border-r-2 border-cyan-400 animate-typewriter',
    fade: 'text-white animate-fade-in'
  }

  return (
    <span 
      className={cn(variants[variant], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  )
}
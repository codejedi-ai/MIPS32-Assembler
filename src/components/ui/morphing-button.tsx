import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface MorphingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  morphTo?: React.ReactNode
  variant?: 'default' | 'glow' | 'neon' | 'glass'
}

export function MorphingButton({ 
  children, 
  morphTo, 
  className, 
  variant = 'default',
  ...props 
}: MorphingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    default: 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400',
    glow: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50',
    neon: 'bg-black border-2 border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
  }

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-xl px-6 py-3 text-white font-medium transition-all duration-500 transform hover:scale-110 active:scale-95',
        variants[variant],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className={cn(
        'block transition-all duration-500 transform',
        isHovered && morphTo ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      )}>
        {children}
      </span>
      
      {morphTo && (
        <span className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-500 transform',
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        )}>
          {morphTo}
        </span>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  )
}
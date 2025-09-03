import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Warrior Life Hackathon | University of Waterloo',
  description: 'The ultimate hackathon celebrating student life at the University of Waterloo. Build solutions that enhance the warrior experience on campus.',
  keywords: ['hackathon', 'university of waterloo', 'student life', 'innovation', 'technology'],
  authors: [{ name: 'Warrior Life Team' }],
  openGraph: {
    title: 'Warrior Life Hackathon',
    description: 'The ultimate hackathon celebrating student life at the University of Waterloo',
    type: 'website',
    locale: 'en_CA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
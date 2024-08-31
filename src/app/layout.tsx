import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Modals } from '@/components/modals'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Management App',
  description: 'Project Management App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <Modals />
        {children}
      </body>
    </html>
  )
}

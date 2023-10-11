import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upload Products',
  description: 'Created by LV Digital',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>{children}</>
  )
}

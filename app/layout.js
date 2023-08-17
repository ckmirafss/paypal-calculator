import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PayPal Calculator',
  description: 'PayPal Calculator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white` + inter.className}>{children}</body>
    </html>
  )
}

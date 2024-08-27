import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body antialiased min-h-screen bg-background text-foreground`}>
        <nav className="p-4 bg-primary text-primary-foreground">
          <a href="/dashboard" className="mr-4">Dashboard</a>
          <a href="/messaging" className="mr-4">Messaging</a>
          <a href="/subscription">Subscription</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
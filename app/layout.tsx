import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tricoci Marketing Dashboard',
  description: 'Marketing analytics dashboard for Tricoci University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className="layout-fixed sidebar-expand-lg bg-body-tertiary">
        {children}
      </body>
    </html>
  )
}

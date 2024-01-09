import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Modal from './components/Modals/Modal'
import RegisterModal from './components/Modals/RegisterModal'

export const metadata: Metadata = {
  title: 'Devanca Tours',
  description: 'The great tour sales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Implement the main navbar for the entire website */}
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

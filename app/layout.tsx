import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import Modal from './components/Modals/Modal'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './components/providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUsers'

export const metadata: Metadata = {
  title: 'Devanca Tours',
  description: 'The great tour sales',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        {/* Implement the main navbar for the entire website */}
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}

// Import the Metadata type from the 'next' module
import type { Metadata } from 'next'

// Import global styles from the 'globals.css' file
import './globals.css'

// Import React components for the layout
import Navbar from './components/navbar/Navbar'
import Modal from './components/Modals/Modal'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './components/providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUsers'
import RentModal from './components/Modals/RentModal'
import SearchModal from './components/Modals/SearchModal'

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Devanca Tours',
  description: 'The great tour sales',
}

// RootLayout function component definition
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the current user asynchronously
  const currentUser = await getCurrentUser()

  // Return the HTML structure for the entire page layout
  return (
    <html lang="en">
      <body>
        {/* Implement a provider for displaying toasts throughout the website */}
        <ToasterProvider />

        {/* Render different modals for registration, renting, searching, and logging in */}
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <LoginModal />

        {/* Render the main navigation bar with the current user information */}
        <Navbar currentUser={currentUser} />

        {/* Main content container with top and bottom padding */}
        <div className='pb-20 pt-28'>
          {children} {/* Render the children components passed to RootLayout */}
        </div>
      </body>
    </html>
  )
}


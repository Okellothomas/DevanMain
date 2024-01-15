'use client'

import { User } from "@prisma/client"
import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface NavbarProps {
  currentUser?: User | null
}
const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {

  return (
    <nav>
          <div className="nav">
            <Container>
            {/* Add logo to the navbar */}
                <div className="nav-logo">
                      <Logo /> 
                      <Search />
                      <UserMenu currentUser={currentUser}/>
                  </div>
            </Container>
        </div>   
    </nav>
  )
}

export default Navbar
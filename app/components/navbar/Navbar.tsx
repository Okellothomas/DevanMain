'use client'

import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
const Navbar = () => {
  return (
    <nav>
          <div className="nav">
            <Container>
            {/* Add logo to the navbar */}
                <div className="nav-logo">
                      <Logo /> 
                      <Search />
                      <UserMenu />
                  </div>
            </Container>
        </div>   
    </nav>
  )
}

export default Navbar
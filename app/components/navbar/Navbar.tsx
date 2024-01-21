'use client'
import { User } from "@prisma/client"
import Container from "../container/Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from "@/app/types"
import Categories from "./Categories"
import Nav from "./nav/Nav"

interface NavbarProps {
  currentUser?: SafeUser | null
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
            {/* <Search /> */}
                      <Nav />
                      <UserMenu currentUser={currentUser}/>
                  </div>
            </Container>
      </div> 
      <Categories />
    </nav>
  )
}

export default Navbar
'use client'

import UserMenu from "../UserMenu"
import Destinations from "./Destination"
import Hotels from "./Hotels"
import House from "./House"
import Tours from "./Tours"
import Ways from "./Ways"

const Nav = () => {
  return (
    <div className="nav-main-nav flex flex-col sm:flex-row sm:mx-8 sm:gap-8 justify-between sm:items-start items-center">
      <Destinations/>
      <Hotels />
      <Ways />
      <House />
      <Tours /> 
    </div>
  )
}

export default Nav;

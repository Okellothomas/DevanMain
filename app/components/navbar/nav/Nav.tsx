'use client'

import UserMenu from "../UserMenu"
import Destinations from "./Destination"
import Hotels from "./Hotels"
import House from "./House"
import Tours from "./Tours"
import Ways from "./Ways"

const Nav = () => {
  return (
    <div className="flex flex-row gap-8 justify-between items-center">
          <Destinations/>
          <Hotels />
          <Ways />
          <House />
          <Tours /> 
    </div>
  )
}

export default Nav
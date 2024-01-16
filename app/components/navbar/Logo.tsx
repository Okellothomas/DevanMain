'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {

    const router  = useRouter()
    return (
    <div className="flex items-center cursor-pointer gap-2">
     <div className="logo-image-background">
          <Image
          onClick={() => router.push('/')}
          alt="logo"
          className="hidden md:block cursor-pointer"
          height="40"
          width="40"
          src="/images/logo.png"
        />
        </div>
        <div>
          <h2 className="main-color-black">Devan<span className="main-color">ceTours</span></h2>     
       </div>
    </div>
  )
}

export default Logo
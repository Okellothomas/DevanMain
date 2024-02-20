'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Logo = () => {

    const router  = useRouter()
    return (
    <div className="flex items-center cursor-pointer gap-2">
     <div className="logo-image-background">
          <Image
          onClick={() => router.push('/')}
          alt="logo"
          className="cursor-pointer logo-image-background-image"
          height="30"
          width="30"
          src="/images/logo.png"
        />
        </div>
        <div className="text-2xl font-bold">
          {/* <h2 className="main-color-black">Devan<span className="main-color">ceTours</span></h2>      */}
         <Link href="/"><h2>D-Tours</h2></Link>
       </div>
    </div>
  )
}

export default Logo
'use client'
import Container from "@/app/components/container/Container"
import MainItem from "./MainItem"
import { useRouter } from "next/navigation"
import { BiSolidCar } from "react-icons/bi";
import { IoMdBoat } from "react-icons/io";
import { FaPersonSkiingNordic } from "react-icons/fa6";
import { GiSpeedBoat } from "react-icons/gi";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";


const SearchMain = () => {
    const router = useRouter();
  return (
      <Container>
        <div className="bg-white rounded-2xl z-20 pb-6">
          <div className="justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-12 py-8 px-9 shadow-sm">
              <div className="main-item-border">
                  <MainItem onClick={() => router.push('/discoveryjourney')} icon={BiSolidCar} label="Discovery Tour" />
              </div>
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/oceancruise')} icon={IoMdBoat} label="Ocean Cruises" />
              </div>
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/primeadventures')} icon={FaPersonSkiingNordic} label="Adventures" />
              </div>
               <div className="main-item-border">
                  <MainItem onClick={() => router.push('/countryroads')} icon={GiSpeedBoat} label="Country Roads" />
              </div>
              <div className="main-item-border">
                  <MainItem onClick={() => router.push('/destinations')} icon={TfiMoreAlt} label="More" />
              </div>
              </div>
            <div className="main-item-border-r flex flex-row items-center justify-between mb-8">
                <div className="flex flex-row gap-4 items-center">
                  <IoSearchOutline size={24} />
                      <input
                          placeholder="Place to go ?"
                          type="text"
                          className="outline-none"
                      /> 
                </div>
                <div>
                    <button className="btn-main-page">Search</button>  
                </div>
            </div>
          </div>    
    </Container>
  )
}

export default SearchMain
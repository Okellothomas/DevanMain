'use client'

import {BiSearch} from "react-icons/bi"


const Search = () => {
  return (
      <div className="main-search">
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
                AnyWhere  
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
               Any week   
              </div>
            <div className="hidden sm:block"> Add Guests   
            </div>
            <div className="p-2 bg-indigo-500 rounded-full text-white search-background-icon">
            <BiSearch size={18} />
            </div> 
          </div>
      </div>
  )
}

export default Search
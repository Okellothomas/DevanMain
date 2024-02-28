import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IoBookmarks } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa6";
import { ImAddressBook } from "react-icons/im";
import { PiAddressBookFill } from "react-icons/pi";
import { LiaAddressBookSolid } from "react-icons/lia";
import { PiBookmarksSimpleBold } from "react-icons/pi";
import { PiBookOpenTextBold } from "react-icons/pi";
import { PiBookOpenTextFill } from "react-icons/pi";
import { GiKangaroo } from "react-icons/gi";
import { BiHotel } from "react-icons/bi";
import { GiTreehouse } from "react-icons/gi";
import Link from "next/link";

// Define the interface for the Home component props


// Home component is defined as an asynchronous function
const ProfilePage = async () => {
  // Fetch listings and current user asynchronousl
  return (
      <div className="border-[2px] rounded-xl px-5">
          <div className="w-full text-center items-center py-5">
          <FaCircleUser className="text-neutral-500" size={ 40 } /> 
          </div>
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <FaRegUser className="text-neutral-500" size={26} /> 
          <Link href="/admin/profile">Personal Info</Link>
          </div>
         <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <GiKangaroo className="text-neutral-500" size= {26} /> 
          <Link href="/admin/mytours">My Tours</Link>
         </div>
           <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <BiHotel className="text-neutral-500" size= {26} /> 
          <Link href="/admin/myhotels">My Hotels</Link>
          </div>
           <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <GiTreehouse className="text-neutral-500" size= {26} /> 
          <Link href="/admin/myhouselistings">My House Listings</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <FaSwatchbook className="text-neutral-500" size= {26} /> 
          <Link href="/admin/allbookedtours">All Booked Tours</Link>
          </div>
          <hr />
           <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <LiaSwatchbookSolid className="text-neutral-500" size={26} /> 
          <Link href="/admin/mybookedtours">My Booked Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <IoBookmarks className="text-neutral-500" size={26} /> 
          <Link href="/admin/mybookedhotels">My Booked Hotels</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <PiBookOpenTextFill className="text-neutral-500" size={26} /> 
          <Link href="/admin/allbookedhotels">All Booked Hotels</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <PiBookOpenTextBold className="text-neutral-500" size={26} /> 
          <Link href="/admin/allbookedhouses">All Booked Houses</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <PiBookmarksSimpleBold className="text-neutral-500" size={26} /> 
          <Link href="/admin/mybookedhouses">My Booked Houses</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <LiaAddressBookSolid className="text-neutral-500" size={26} /> 
          <Link href="/admin/hosts">Hotel Hosts</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <PiAddressBookFill className="text-neutral-500" size={26} />  
            <Link href="/admin/operators">Tour Operators</Link> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <ImAddressBook className="text-neutral-500" size={26} /> 
            <Link href="/admin/clients">Clients</Link> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <FaRegAddressBook className="text-neutral-500" size={26} /> 
            <Link href="/admin/administrators">Administrators</Link>
          </div>
    </div>
  )
}

export default ProfilePage
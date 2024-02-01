import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IoBookmarks } from "react-icons/io5";
import { PiBookOpenTextBold } from "react-icons/pi";
import { PiBookOpenTextFill } from "react-icons/pi";
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
          <Link href="/operator/profile">Personal Info</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <PiBookOpenTextBold className="text-neutral-500" size={26} /> 
          <Link href="/operator/mytours">My Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <FaSwatchbook className="text-neutral-500" size= {26} /> 
          <Link href="/operator/myhotels">My Hotels</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <FaSwatchbook className="text-neutral-500" size= {26} /> 
          <Link href="/operator/myhouses">My Houses</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <IoBookmarks className="text-neutral-500" size={26} /> 
          <Link href="/operator/mybookedtours">My Booked Tours</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <IoBookmarks className="text-neutral-500" size={26} /> 
          <Link href="/operator/mybookedhotels">My Booked Hotels</Link>
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
          <PiBookOpenTextFill className="text-neutral-500" size={26} /> 
          <Link href="/operator/mybookedhouses">My Booked Houses</Link>
          </div>
          
    </div>
  )
}

export default ProfilePage
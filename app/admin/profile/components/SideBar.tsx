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
             <p>Personal Information</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <FaSwatchbook className="text-neutral-500" size= {26} /> 
            <p>All Booked Tours</p> 
          </div>
          <hr />
           <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <LiaSwatchbookSolid className="text-neutral-500" size={26} /> 
             <p>My Booked Tours</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <IoBookmarks className="text-neutral-500" size={26} /> 
             <p>All Booked Hotels</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <PiBookOpenTextFill className="text-neutral-500" size={26} /> 
             <p>My Booked Hotels</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <PiBookOpenTextBold className="text-neutral-500" size={26} /> 
             <p>All Booked Houses</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <PiBookmarksSimpleBold className="text-neutral-500" size={26} /> 
             <p>My Booked Houses</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <LiaAddressBookSolid className="text-neutral-500" size={26} /> 
             <p>Hotel Hosts</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <PiAddressBookFill className="text-neutral-500" size={26} /> 
             <p>Tour Operators</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <ImAddressBook className="text-neutral-500" size={26} /> 
             <p>Clients</p> 
          </div>
          <hr />
          <div className="hover:font-semibold text-md flex cursor-pointer hover:bg-neutral-200 flex-row gap-3 py-4 items-center">
            <FaRegAddressBook className="text-neutral-500" size={26} /> 
             <p>Administrators</p> 
          </div>
    </div>
  )
}

export default ProfilePage
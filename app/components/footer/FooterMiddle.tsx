import  { useRouter } from "next/navigation"

const FooterMiddle = () => {
    const router = useRouter();

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4
     text-md text-white w-full py-5 gap-5 md:text-md">
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Terms & Conditions</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Privacy Policy</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">About</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Tour Styles</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Group Styles</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Travel Agents</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Host Sign Up</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Operators Sign Up</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Solo Travel</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Camping</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">News</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Gallary</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Blog</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Country Roads</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Group Size</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Inquire Now</div>
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Contact Us</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Upcoming Tours</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Destinations</div> 
          <div onClick={() => router.push("/trips")} className=" hover:text-red-50 cursor-pointer">Hotels</div>
    </div>
  )
}

export default FooterMiddle
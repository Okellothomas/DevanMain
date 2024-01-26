import  { useRouter } from "next/navigation"
import useRegisterModal from "@/app/hooks/useRegisterModal";

const FooterMiddle = () => {
  const router = useRouter();
  const signUpModal = useRegisterModal()

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4
     text-sm text-white w-full py-5 gap-5 md:text-md">
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Terms & Conditions</div>
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Privacy Policy</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">About</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Tour Styles</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Group Styles</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Travel Agents</div>
          <div onClick={() => signUpModal.onOpen} className=" hover:underline cursor-pointer">Host Sign Up</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Operators Sign Up</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Solo Travel</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Camping</div>
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">News</div>
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Gallary</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Blog</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Country Roads</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Group Size</div>
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Inquire Now</div>
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Contact Us</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Upcoming Tours</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Destinations</div> 
          <div onClick={() => router.push("/trips")} className=" hover:underline cursor-pointer">Hotels</div>
    </div>
  )
}

export default FooterMiddle
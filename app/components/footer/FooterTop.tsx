
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

const FooterTop = () => {
  return (
    <div className="text-white flex flex-row justify-center items-center gap-8 py-3">
          <Link href="www.google.com"><FaFacebookF size={ 28 } /></Link>
          <Link href="www.google.com"><AiFillInstagram size={ 28 } /></Link>
          <Link href="www.google.com"><IoLogoWhatsapp size={ 28 } /></Link>
          <Link href="www.google.com"><FaXTwitter size={ 28 } /></Link>
          <Link href="www.google.com"><FaYoutube size={28} /></Link>
    </div>
  )
}

export default FooterTop
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";

const FooterTop = () => {
  return (
    <div className="text-white flex flex-row justify-center items-center gap-8 py-3">
      <Link href="https://www.facebook.com" target="_blank"><FaFacebookF size={28} /></Link>
      <Link href="https://www.instagram.com" target="_blank"><AiFillInstagram size={28} /></Link>
      <Link href="https://www.whatsapp.com" target="_blank"><IoLogoWhatsapp size={28} /></Link>
      <Link href="https://www.twitter.com" target="_blank"><FaXTwitter size={28} /></Link>
      <Link href="https://www.youtube.com" target="_blank"><FaYoutube size={28} /></Link>
    </div>
  );
};

export default FooterTop;

import Image from "next/image";

const FooterBottom = () => {
  return (
    <div className="flex flex-row justify-between items-center text-white py-4">
      <div className="text-md">
        &copy; 2014 - 2024 DevanceTours Inc.
      </div>
      <div className="flex flex-row gap-7 justify-end items-center">
        <Image src="/images/google.png" height="30" width="30"  alt=""  className="footer-main-images" />
        <Image src="/images/master.jpg" height="30" width="30"  alt=""  className="footer-main-images" />
        <Image src="/images/paypal.jpg" height="30" width="30"  alt=""  className="footer-main-images" />
        <Image src="/images/visa.jpg" height="30" width="30"   alt="" className="footer-main-images" />
      </div>
    </div>
  );
};

export default FooterBottom;

import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "../MenuItem";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import useRentModal from "@/app/hooks/useRentModals";
import { SlArrowDown } from "react-icons/sl";

interface DestinationsItemProp {
  onClick?: () => void;
  label?: string;
}

const Destinations: React.FC<DestinationsItemProp> = ({ onClick, label }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClickOutside = useCallback(
  (event: MouseEvent) => {
    if (menuRef.current && !((menuRef.current as HTMLElement).contains(event.target as Node))) {
      setIsOpen(false);
    }
  },
  [menuRef]
);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" onClick={onClick}>
      <div className="flex flex-row items-center gap-3">
        <div
          ref={menuRef}
          className={`p-4 md:py-1 text-sm hover:underline md:px-2 flex flex-row items-center gap-2 cursor-pointer transition ${
            isOpen ? "" : ""
          }`}
          onClick={toggleOpen}
        >
          <div className="hidden md:block">Destinations</div>
          <SlArrowDown size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-6 font-normal w-full cursor-pointer">
            <>
              <MenuItem onClick={() => router.push("/destinations")} label="Destinations" />
              <MenuItem
                onClick={() => router.push("/africandestinations")}
                label="African"
              />
              <MenuItem
                onClick={() => router.push("/europeandestinations")}
                label="European"
              />
              <MenuItem
                onClick={() => router.push("/americandestinations")}
                label="The Americas"
              />
              <MenuItem
                onClick={() => router.push("/asiandestinations")}
                label="Asian"
              />
              {/* <MenuItem
                onClick={() => router.push("/middleastdestinations")}
                label="Middle East"
              /> */}
              <MenuItem
                onClick={() => router.push("/australiandestinations")}
                label="Australian"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;

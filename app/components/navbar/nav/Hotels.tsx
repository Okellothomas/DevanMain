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

const Hotels: React.FC<DestinationsItemProp> = ({ onClick, label }) => {
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
            isOpen ? "bg-white" : ""
          }`}
          onClick={toggleOpen}
        >
          <div className="hidden md:block">Hotels</div>
          <SlArrowDown size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-white overflow-hidden right-0 top-12 text-sm user-menu-width">
          <div className="flex flex-col w-full cursor-pointer">
            <>
              <MenuItem onClick={() => router.push("/hotels")} label="All Hotels" />
              <MenuItem
                onClick={() => router.push("/favorites")}
                label="My favorites"
              />
              <MenuItem
                onClick={() => router.push("/reservations")}
                label="My reservation"
              />
              <MenuItem
                onClick={() => router.push("/properties")}
                label="My properties"
              />
              <MenuItem onClick={rentModal.onOpen} label="My Airbnb home" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;

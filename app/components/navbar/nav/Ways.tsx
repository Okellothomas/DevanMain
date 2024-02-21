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

const Ways: React.FC<DestinationsItemProp> = ({ onClick, label }) => {
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
          <div className="text-sm">Ways to travel</div>
          <SlArrowDown size={12} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute nav-small-way rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-6 w-full cursor-pointer">
            <>
              <MenuItem onClick={() => router.push("/discoveryjourney")} label="Discovery Journey" />
              <MenuItem
                onClick={() => router.push("/regionaljourney")}
                label="Regional Journey"
              />
              <MenuItem
                onClick={() => router.push("/countryroads")}
                label="Country Roads"
              />
              <MenuItem
                onClick={() => router.push("/oceancruise")}
                label="Ocean cruise"
              />
              {/* <MenuItem
                onClick={() => router.push("/primeadventures")}
                label="Prime adventures"
              /> */}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ways;

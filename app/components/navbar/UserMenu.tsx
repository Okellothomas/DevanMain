import { AiOutlineMenu } from "react-icons/ai";
import Avater from "../container/Avater";
import { useCallback, useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useTourModal from "@/app/hooks/useTourModel";
import useRentModal from "@/app/hooks/useRentModals";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { MdOutlineAdminPanelSettings, MdOutlineHotel, MdOutlineHouseboat } from "react-icons/md";
import { GiKangaroo } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const rentModal = useRentModal();
  // declare the tour modal
  const tourModal = useTourModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen();
    }

    // Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, LoginModal, rentModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          className={`p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition ${
            isOpen ? "" : ""
          }`}
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avater src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-white text-black overflow-hidden right-0 top-11 text-sm user-menu-width">
          <div className="flex flex-col px-2 w-full cursor-pointer">
            {currentUser ? (
              <>
                {currentUser.userType === 'host' ?
                  <div>
                    <MenuItem onClick={() => router.push("/trips")} label="Host demo menu" />
                    <hr />
                    <MenuItem onClick={() => signOut()} label="Logout" />
                    <MenuItem onClick={() => router.push("/trips")} label="My Trips" />
                    <MenuItem onClick={() => router.push('/favorites')} label="My favorites" />
                    <MenuItem onClick={() => router.push("/reservations")} label="My reservation" />
                    <MenuItem onClick={() => router.push('/properties')} label="My properties" />
                    <MenuItem onClick={rentModal.onOpen} label="Add Hotel or House Listing" />
                    <MenuItem onClick={tourModal.onOpen} label="Add Tour" />
                    <hr />
                    <MenuItem onClick={() => signOut()} label="Logout" />
                  </div>
                  :
                  currentUser.userType === 'operator' ?
                    <div>
                    <MenuItem onClick={() => router.push("/trips")} label="My Trips" />
                    <MenuItem onClick={() => router.push('/favorites')} label="My favorites" />
                    <MenuItem onClick={() => router.push("/reservations")} label="My reservation" />
                    <MenuItem onClick={() => router.push('/properties')} label="My properties" />
                    <MenuItem onClick={rentModal.onOpen} label="Add Hotel or House Listing" />
                    <MenuItem onClick={tourModal.onOpen} label="Add Tour" />
                    <hr />
                    <MenuItem onClick={() => signOut()} label="Logout" />
                    </div>
                    :
                    currentUser.userType === 'admin' ?
                      <div>
                      <div className="flex flex-row items-center"><CiUser size={23} /> <MenuItem onClick={() => router.push("/admin/profile")} label="My profile" /></div>
                      <div className="flex flex-row items-center"><MdOutlineAdminPanelSettings size={23} /><MenuItem onClick={rentModal.onOpen} label="Add administrator" /></div>
                      <div className="flex flex-row items-center"><MdOutlineHotel size={23 } /><MenuItem onClick={rentModal.onOpen} label="Add hotel" /></div>
                      <div className="flex flex-row items-center"><MdOutlineHouseboat size={23 } /><MenuItem onClick={rentModal.onOpen} label="Add house lease" /></div>
                      <div className="flex flex-row items-center"><GiKangaroo size={23 } /><MenuItem onClick={tourModal.onOpen} label="Add tour" /></div>
                      <hr />
                      <div className="flex flex-row items-center"><CiLogin size={23 } /><MenuItem onClick={() => signOut()} label="Logout" /></div>
                      </div>
                      :
                      <>
                      <div>
                      <div className="flex flex-row items-center"><CiUser size={23} /> <MenuItem onClick={() => router.push("/client/profile")} label="My profile" /></div>
                      <div className="flex flex-row items-center"><IoIosHeartEmpty size={23} /> <MenuItem onClick={() => router.push("/favorites")} label="My favorites" /></div>
                      <hr />
                      <div className="flex flex-row items-center"><CiLogin size={23 } /><MenuItem onClick={() => signOut()} label="Logout" /></div>
                      </div>
                      </>
            }
              </>
            ) : (
              <>
                <MenuItem onClick={LoginModal.onOpen} label="Login" />
                <MenuItem onClick={()=>registerModal.onOpen('client')} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

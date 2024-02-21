'use client'
// Navbar component
import React, { useState, useEffect } from "react";
import { SafeUser } from "@/app/types";
import Container from "../container/Container";
import Logo from "./Logo";
import Nav from "./nav/Nav";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu toggle

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed sm:py-4 md:py-3 lg:py-2 xl:py-2 2xl:py-2 max-2xl:py-2 w-full z-20 shadow-sm ${
        isScrolled ? "bg-white text-black hover:text-black" : "bg-black bg-opacity-50 text-white"
      } ${isMenuOpen ? "h-screen" : ""}`} // Added conditional class for height
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="">
            <Logo />
          </div>

          {/* Nav and UserMenu for Large Screens */}
          <div className="hidden sm:flex flex-grow items-center justify-between sm:gap-6 sm:text-start sm:items-start sm:ml-10 gap-3">
            <div className="logos-nav-barss">
              <Logo />
            </div>
            <Nav />
            <UserMenu currentUser={currentUser} />
          </div>

          {/* Menu Button for Small Screens */}
          <div className="sm:hidden">
            <button
              className={`block focus:outline-none ${isScrolled ? "text-black" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Menu for Small Screens */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="flex flex-col items-start gap-3 mt-3">
              <Nav />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;

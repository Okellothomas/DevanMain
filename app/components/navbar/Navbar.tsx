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

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true when the user has scrolled down
      setIsScrolled(window.scrollY > 0);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <nav
      // className={`fixed w-full z-20 shadow-sm ${
      //   isScrolled ? "bg-white" : "bg-transparent"
      // }`}
      className={`fixed w-full z-20 shadow-sm ${
          isScrolled ? "bg-white text-black hover:text-black" : "bg-black bg-opacity-40 text-white"
        }`}
      >
      <div className="nav">
        <Container>
          {/* Add logo to the navbar */}
          <div className="nav-logo">
            <Logo />
            <Nav />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;

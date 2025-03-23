import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-gray-50 to-gray-400 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-2 py-2">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="https://www.f6s.com/postack-solutions" target='_blank'>
            <Image
              src="/Postack_logo.jpeg"
              alt="Postack Solutions"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <Link href="https://www.f6s.com/postack-solutions" target='_blank'
            className="text-xl font-bold transition-colors duration-300 text-blue-950"
          >  
            Postack Solutions
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className={`lg:hidden text-2xl cursor-pointer transition-colors duration-300 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Links */}
        <ul
          className={`fixed top-0 left-0 w-full h-full bg-blue flex flex-col items-center justify-center gap-6 text-lg transition-transform duration-300 lg:static lg:flex lg:flex-row lg:gap-8 lg:bg-transparent lg:h-auto lg:w-auto ${
            isOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'
          }`}
        >
          <li>
            <Link
              href="#aboutus"
              className="text-gray-600 hover:text-blue-300 font-semibold transition-colors duration-300"
              onClick={() => {
                closeMenu(); // Close the menu immediately
              }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-gray-600 hover:text-blue-300 font-semibold transition-colors duration-300"
              onClick={() => {
                closeMenu(); // Close the menu immediately
              }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#hosting"
              className="text-gray-600 hover:text-blue-300 font-semibold transition-colors duration-300"
              onClick={() => {
                closeMenu(); // Close the menu immediately
              }}
            >
              Hosting
            </Link>
          </li>
          <li>
            <Link
              href="#contactus"
              className="text-gray-600 hover:text-blue-300 font-semibold transition-colors duration-300"
              onClick={() => {
                closeMenu(); // Close the menu immediately
              }}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Call-to-Action Button */}
        <div className="hidden lg:flex">
          <a
            href="https://www.f6s.com/postack-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 btn btn-primary text-white hover:bg-blue-700 transition-all duration-300"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
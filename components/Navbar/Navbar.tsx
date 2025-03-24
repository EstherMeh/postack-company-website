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

  return (
    <>
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
            <Link 
              href="https://www.f6s.com/postack-solutions" 
            target='_blank'
            className="text-xl font-bold transition-colors duration-300 text-blue-950"
            >  
            Postack Solutions
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {[
              { href: '#aboutus', text: 'About Us' },
              { href: '#services', text: 'Services' },
              { href: '#hosting', text: 'Hosting' },
              { href: '#contactus', text: 'Contact Us' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 hover:text-blue-300 font-semibold transition-colors duration-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

          {/* Hamburger Menu Icon */}
          <div
            className={`lg:hidden text-2xl cursor-pointer transition-colors duration-300 font-semibold z-50 ${
              scrolled ? 'text-gray-800' : 'text-gray-600 hover:text-blue-300'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

        {/* Desktop Call-to-Action Button */}
        <div className="hidden lg:flex">
          <a
            href="#services"
            className="px-4 py-2 btn btn-primary text-white hover:bg-blue-700 transition-all duration-300"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>

      {/* Mobile Menu - Positioned below navbar */}
      <div
        className={`fixed top-[60px] left-3/4 transform -translate-x-1/2 w-[40%] max-w-md bg-white rounded-lg shadow-lg transition-all duration-300 lg:hidden z-40 ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="py-2">
          {[
            { href: '#aboutus', text: 'About Us' },
            { href: '#services', text: 'Services' },
            { href: '#hosting', text: 'Hosting' },
            { href: '#contactus', text: 'Contact Us' },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-6 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-300 font-semibold transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            </li>
          ))}
          <li className="border-t border-gray-100 mt-2">
            <a
              href="#services"
              className="block px-6 py-3 text-center text-blue-600 hover:bg-blue-50 font-semibold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Get started
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
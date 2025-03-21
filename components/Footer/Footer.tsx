import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { PiTiktokLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-gray-50 to-gray-200 text-blue-950 p-10">
        <nav>
            <h6 className="footer-title">Services</h6>
            <a href='' className="link link-hover">Hosting Solutions</a>
            <a className="link link-hover">Web Development</a>
            <a className="link link-hover">Mobile App Development</a>
            <a className="link link-hover">Custom Software Development</a>
        </nav>
        <nav>
            <h6 className="footer-title">Company</h6>
            <a href='#' className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
        <div className="footer bg-inherit items-center p-4">
        <aside className="grid-flow-col items-center">
            <Link href="https://www.f6s.com/postack-solutions" target='_blank'>
                <Image src="/Postack_logo.jpeg" alt="Postack Solutions" width={40} height={40}/>
            </Link>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <div className="flex justify-center md:justify-end gap-4">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://x.com/POSTACKSOL41612" target='_blank' aria-label="X.com">
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://www.tiktok.com/@postack.solutions" target='_blank' aria-label="Tiktok">
              <PiTiktokLogo className="h-6 w-6" />
            </a>
          </div>
        </div>
    </footer>
  )
}

export default Footer
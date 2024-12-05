'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { Nunito } from 'next/font/google';
import { useUser } from '../context/UserContext'; // Import useUser hook

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function StudentHeader() {
  const { isLoggedIn, logout } = useUser(); // Get isLoggedIn and logout from UserContext

  return (
    <Navbar shouldHideOnScroll className="absolute top-0 right-0 w-full z-10 p-4">
      <NavbarBrand className="ml-4 font-nunito font-semibold">Spark Bytes</NavbarBrand>
      <NavbarContent justify="end" className="flex gap-4 mr-4">
        <NavbarItem>
          <Link href="/" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/frontend/pages/about" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            about
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/frontend/pages/attend-events" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            attend events
          </Link>
        </NavbarItem>
        {isLoggedIn && ( // Show logout button only if logged in
          <NavbarItem>
            <button 
              onClick={logout} 
              className="text-current hover:text-red-400 duration-300 font-nunito font-semibold"
            >
              logout
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
} 
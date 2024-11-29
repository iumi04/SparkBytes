'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function StudentHeader() {
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
          <Link href="/about" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            about
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/attend-events" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            attend events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login" className="text-current hover:text-blue-400 duration-300 font-nunito font-semibold">
            login
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 
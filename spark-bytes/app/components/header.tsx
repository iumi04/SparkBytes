'use client'; // This is a client component

import { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Navbar shouldHideOnScroll className="absolute top-0 right-0 w-full">
      <NavbarBrand className="ml-4">Spark Bytes</NavbarBrand>
      <NavbarContent justify="end" className="flex gap-4 mr-4">
        <NavbarItem>
          <Link href="/" className="text-current hover:text-blue-500">
            home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" className="text-current hover:text-blue-500">
            about
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/events" className="text-current hover:text-blue-500">
            events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login" className="text-current hover:text-blue-500">
            login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

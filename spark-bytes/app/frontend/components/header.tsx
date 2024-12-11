// components/Header.tsx
'use client';

import { NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; // Import useUser hook
import { Nunito } from 'next/font/google';

import BaseHeader from './BaseHeader'; // Import BaseHeader component

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

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
    <BaseHeader>
      <NavbarItem>
        <Link href="/" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/frontend/pages/about" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          about
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/frontend/pages/events" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          events
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/frontend/pages/login" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          login
        </Link>
      </NavbarItem>
    </BaseHeader>
  );
}

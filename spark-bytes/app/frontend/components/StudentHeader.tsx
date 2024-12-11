// components/StudentHeader.tsx
'use client';

import { NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';

import BaseHeader from './BaseHeader'; // Import BaseHeader component

export default function StudentHeader() {
  const { isLoggedIn, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
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
        <Link href="/frontend/pages/my-events" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          my events
        </Link>
      </NavbarItem>
      {isLoggedIn && (
        <NavbarItem>
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400 duration-300 font-nunito font-semibold"
          >
            logout
          </button>
        </NavbarItem>
      )}
    </BaseHeader>
  );
}

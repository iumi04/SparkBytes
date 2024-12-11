// components/EventOrganizerHeader.tsx
'use client';

import { NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { useUser } from '../context/UserContext'; // Import useUser hook
import { useRouter } from 'next/navigation';  // Add this import

import BaseHeader from './BaseHeader'; // Import BaseHeader component

export default function EventOrganizerHeader() {
  const router = useRouter();
  const { isLoggedIn, logout } = useUser(); // Get isLoggedIn and logout from UserContext

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
        <Link href="/frontend/pages/manage-my-events" className="text-white hover:text-blue-400 duration-300 font-nunito font-semibold">
          manage my events
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

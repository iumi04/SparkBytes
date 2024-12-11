// components/BaseHeader.tsx
'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { Nunito } from 'next/font/google';
import { RxLightningBolt } from "react-icons/rx";
import { ReactNode } from 'react';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface BaseHeaderProps {
  children: ReactNode; // Allow custom content (links, buttons) to be passed as children
}

export default function BaseHeader({ children }: BaseHeaderProps) {
  return (
    <Navbar shouldHideOnScroll className="absolute top-0 right-0 w-full z-10 p-4 bg-gray-800">
      <NavbarBrand className="ml-4 font-nunito font-semibold text-white">
        <span>Spark</span>
        <RxLightningBolt />
        <span>Bytes</span>
      </NavbarBrand>
      <NavbarContent justify="end" className="flex gap-4 mr-4">
        {children} {/* Render custom content passed as children */}
      </NavbarContent>
    </Navbar>
  );
}

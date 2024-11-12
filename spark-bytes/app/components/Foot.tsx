import React from "react";
import { Nunito } from 'next/font/google';
import Link from 'next/link';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function Foot() {
  return (
    <footer className="flex justify-between items-center p-4 bg-gray-800 text-white font-nunito">
      <div className="w-1/4 text-left">
      <img src="Spark!Bytes_Logo.png" className="h-[48px] object-contain"></img>
      </div>
      <div className="w-1/4 text-center">
      <p className="text-lg font-bold">Spark!Bytes</p>
      <p><Link href="/about">About</Link></p>
      <Link href="/developers">Developers</Link>
      <button>Events</button>
      </div>
      <div className="w-1/4 text-center">
      <p className="text-lg font-bold">Reach us at</p>
      </div>
      <div className="w-1/4 text-right">
      <p className="text-lg font-bold">Connect with us</p>
      </div>
    </footer>
  );
}

export default Foot;

import React from "react";
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'; // Importing social icons

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function Foot() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center p-8 bg-gray-800 text-white font-nunito space-y-6 md:space-y-0">
      {/* Logo Section */}
      <div className="text-center md:text-left w-full md:w-1/4">
        <img src="Spark!Bytes_Logo.png" className="h-[48px] object-contain mx-auto md:mx-0" alt="Spark!Bytes Logo" />
      </div>

      {/* Navigation Section */}
      <div className="text-center md:text-left w-full md:w-1/4">
        <p className="text-2xl font-bold mb-2">Spark!Bytes</p>
        <p><Link href="/frontend/pages/about" className="hover:underline">About</Link></p>
        <p><Link href="/frontend/pages/developers" className="hover:underline">Developers</Link></p>
        <button className="mt-2 py-1 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Events</button>
      </div>

      {/* Reach us at Section */}
      <div className="text-center w-full md:w-1/4">
        <p className="text-xl font-bold mb-2">Reach us at</p>
        <p className="text-lg">sparkbytes@bu.edu</p>
      </div>

      {/* Connect with us Section */}
      <div className="text-center w-full md:w-1/4">
        <p className="text-xl font-bold mb-2">Connect with us</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600">
            <FaLinkedin />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-800">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Foot;
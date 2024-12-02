'use client'; // Ensure this is a client component

import { useUser } from '../../context/UserContext'; // Import useUser
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader"; // Import StudentHeader
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; // Import EventOrganizerHeader
import '../globals.css';
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Foot from "../../components/Foot";
import { useState, useEffect } from 'react';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Developers() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
        <div className="flex w-full max-w-4xl flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 mt-20">Meet the Developers</h1>

          {/* Developers Grid */}
          <div className="space-y-12 w-full">
            {/* Developer 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/developer1.jpg" // Replace with actual developer photo
                alt="Developer 1"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Umi Imai</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Frontend Developer</p>
                    <p><b>Bio:</b> Prashant is a third-year CS student at Boston University. He loves solving complex problems and enjoys basketball.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/developer2.jpg" // Replace with actual developer photo
                alt="Developer 2"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Aiden Wong</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Backend Developer</p>
                    <p><b>Bio:</b> Aiden is passionate about data and APIs. She specializes in building efficient server-side applications.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer 3 */}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/developer3.jpg" // Replace with actual developer photo
                alt="Developer 3"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Pranit Duddupudi</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Backend Developer</p>
                    <p><b>Bio:</b> Pranit is responsible for making the app user-friendly and visually appealing, focusing on design consistency.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer 4 */}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/developer4.jpg" // Replace with actual developer photo
                alt="Developer 4"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Martin So</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Frontend Developer</p>
                    <p><b>Bio:</b> Martin coordinates the team and ensures timely delivery of features while managing client relationships.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

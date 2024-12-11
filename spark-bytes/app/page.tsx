'use client'; // Ensure this is a client component

import Header from "./frontend/components/Header";
import StudentHeader from "./frontend/components/StudentHeader";
import EventOrganizerHeader from "./frontend/components/EventOrganizerHeader";
import { useUser } from './frontend/context/UserContext';
import './globals.css';
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Foot from "./frontend/components/Foot";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}

      {/* Main Content with Background Image */}
      <div 
        className="flex items-center justify-center min-h-screen p-8 bg-cover bg-center text-foreground" 
        style={{ backgroundImage: "url('/Boston_SEGD-Skyline_1920x1080.jpg')" }}
      >
        <div className="flex w-full max-w-4xl">
          <div className="w-1/2 animate-blurIn">
            <Image
              className="dark:invert rounded-lg object-cover object-center"
              src="/spark_bytes.jpeg"
              alt="Spark Bytes logo"
              width="100%"
              height="auto"
            />
          </div>
          <div className="w-1/2 p-8 font-nunito animate-blurIn">
  {/* Wrapper for heading with an opaque background */}
  <div className="p-4 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
    <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
      {/* Spark! Bytes Heading */}
      <h1 className="text-4xl font-bold text-black">
        Spark! Bytes
      </h1>
    </div>
  </div>

  {/* Description Section */}
  <div className="p-0.5 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300 mt-6">
    <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
      Spark! Bytes is a revolutionary platform for Boston University's community. After events, any leftover food can be posted here, and those interested can sign up to grab some delicious free food.
    </div>
  </div>
</div>

        </div>
      </div>

      <Foot />
    </>
  );
}

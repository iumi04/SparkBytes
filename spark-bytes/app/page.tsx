'use client'; // Ensure this is a client component

import Header from "./components/header";
import StudentHeader from "./components/StudentHeader";
import EventOrganizerHeader from "./components/EventOrganizerHeader";
import { useUser } from './context/UserContext';
import './globals.css';
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Foot from "./components/Foot";

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
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
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
            <h1 className="text-4xl font-bold mb-3 mt-20">spark! bytes</h1>
            <div className="p-0.5 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
              <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                Spark! Bytes is a revolutionary platform for Boston University's community. After events, any leftover food can be posted here, and those interested can sign up to grab some delicious free food.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot></Foot>      
    </>
  );
}

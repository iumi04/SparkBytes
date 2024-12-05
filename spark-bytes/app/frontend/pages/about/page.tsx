'use client'; // Ensure this is a client component

import { useUser } from '../../context/UserContext'; // Import useUser
import Header from "../../components/Header"; 
import Foot from "../../components/Foot"; 
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import StudentHeader from "../../components/StudentHeader"; // Import StudentHeader
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; // Import EventOrganizerHeader

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function About() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-8 pt-32">
        <div className="flex flex-col w-full max-w-5xl space-y-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1">
              <Image
                className="dark:invert rounded-lg object-cover object-center"
                src="/spark_bytes.jpeg"
                alt="About Spark Bytes"
                width="100%"
                height="auto"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className={`text-4xl font-semibold text-primary mb-4 ${nunito.className}`}>
                About Spark! Bytes
              </h1>
              <div className={`font-nunito text-lg p-6 bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg backdrop-blur-md space-y-6`}>
                <p>
                  Spark! Bytes is a revolutionary platform built for the Boston University community. Our mission is
                  to reduce food waste and provide free meals to students. After events, any leftover food can be posted
                  here, and BU students can sign up to claim and enjoy delicious, free meals.
                </p>
                <p>
                  Whether you're a student in need of a quick meal or an event organizer with excess food, Spark! Bytes
                  connects the BU community. With a simple click, you can donate food or claim leftovers, creating a
                  sustainable and connected campus.
                </p>
                <p>
                  Join us in our mission to reduce food waste and promote sustainability on campus. Together, we can make a
                  positive impact on both the environment and the BU community.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h2 className={`text-2xl font-semibold text-primary mb-4 ${nunito.className}`}>
              Join the Movement
            </h2>
            <p className={`font-nunito text-lg max-w-2xl mx-auto`}>
              Be a part of the change! Sign up today to donate food or claim free meals. Together, we can reduce waste
              and help one another. Let's make BU a more sustainable place, one meal at a time.
            </p>
            <div className="mt-8">
              <a
                href="/frontend/pages/signup" //link to login/register pg when we make it <<IMPORTANT>>
                className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

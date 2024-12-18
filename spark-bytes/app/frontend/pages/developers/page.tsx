'use client'; 

import { useUser } from '../../context/UserContext'; //user context stuff to determine what type of user is logged in
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader"; //import both headers -- StudentHeader
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; //and EventOrganizerHeader here
import '../../../globals.css';
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Foot from "../../components/Foot";
import { useState, useEffect } from 'react';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Developers() {
  const { isLoggedIn, userType } = useUser(); //same functionality (logic) from the other pages

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

          {/*the grid for the developers*/}
          <div className="space-y-12 w-full">
            {/*developer 1: Umi */}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/Umi_pic.jpg" 
                alt="Developer 1"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Umi Imai</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Frontend Developer</p>
                    <p><b>Bio:</b> Umi is the team leader and spearheaded the frontend. He enjoys coding and loves playing basketball.</p>
                  </div>
                </div>
              </div>
            </div>

            {/*developer 2: Aiden*/}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/Aiden_pic.jpg" 
                alt="Developer 2"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Aiden Wong</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Backend Developer</p>
                    <p><b>Bio:</b> Aiden is passionate about data and APIs. He is passionate in building impactful solutions, and is a fan of the NBA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/*developer 3: Pranit*/}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/Peachy_pic.jpg" 
                alt="Developer 3"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Pranit Duddupudi</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Backend Developer</p>
                    <p><b>Bio:</b> Pranit is responsible for making the app user-friendly and managing all the data, focusing on keeping the server up.</p>
                  </div>
                </div>
              </div>
            </div>

            {/*developer 4: Martin*/}
            <div className="flex flex-col md:flex-row items-center justify-center animate-blurIn space-x-8">
              <Image
                className="rounded-full object-cover w-32 h-32 mb-4 md:mb-0"
                src="/Martin_pic.jpg" 
                alt="Developer 4"
                width={128}
                height={128}
              />
              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-xl font-semibold">Martin So</h3>
                <div className="p-2 mt-2 rounded-2xl bg-gradient-to-r from-white/10 to-gray-300">
                  <div className="text-black bg-white rounded-2xl shadow-lg backdrop-blur-md p-4">
                    <p><b>Role:</b> Frontend Developer</p>
                    <p><b>Bio:</b> Martin coordinates the team and works on the frontend functionality of the website. He enjoys skiing and has a pet dog.</p>
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

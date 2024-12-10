'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Image, Button, Spinner } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function MyEvents() {
  const { isLoggedIn, userType } = useUser(); 
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); 

  useEffect(() => {
    if (!isLoggedIn || userType?.toLowerCase() !== 'student') {
        alert("You are not allowed to view this page.");
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events"); 
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const renderHeader = () => {
    if (isLoggedIn) {
      return userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}

      <div className={`min-h-screen pt-32 p-8 bg-background text-foreground ${nunito.className}`}> 
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className={`text-4xl font-semibold text-primary mb-4`}>
              My Events
            </h1>
            <p className={`text-lg max-w-2xl mx-auto mb-12`}>
              Here you can see all the events that you have signed up for and cancel any events you will no longer be attending.
            </p>
          </div>
          

          {/* Events Grid 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-md flex flex-col h-auto">
                <div className="flex-1 mb-4">
                  <Image
                    className="dark:invert rounded-lg object-cover object-center"
                    src="/spark_bytes.jpeg" 
                    alt={event.title}
                    width="100%"
                    height="150px" // Change img height here
                  />
                </div>
                <div className="flex-1 text-center lg:text-left mb-4">
                  <h2 className={`text-2xl font-semibold text-primary mb-2`}>
                    {event.title}
                  </h2>
                  <p className={`text-lg mb-4`}>
                    {event.description}
                  </p>
                  <Button 
                    as="a"
                    href={`/frontend/pages/manage-events/${event._id}`} 
                    color="primary" 
                    className="text-lg py-2 px-6 rounded-full"
                  >
                    Manage Event
                  </Button>
                </div>
              </div>
            ))}
          </div>
          */}
        </div>
      </div>
      <Foot />
    </>
  );
}

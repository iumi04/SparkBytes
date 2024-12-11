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
import EventCard from "../../components/EventCard";
import { Event } from "../../types/types";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function MyEvents() {
  const { isLoggedIn, userType, userId } = useUser(); 
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  useEffect(() => {
    //if they arent logged in they should not be able to access this page
    if (!isLoggedIn) {
        alert("You are not allowed to view this page.");
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //fetch event data from database
        const response = await fetch("http://127.0.0.1:5000/get_events");
        const data = await response.json();
        console.log(data);
        console.log("userId: " + userId);
        const filteredEvents = data.filter((event: Event) => 
          userId && Array.isArray(event.signed_up_by) && event.signed_up_by.includes(String(userId))
        );
        //filter events
        console.log("filteredEvents: "+filteredEvents );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderHeader = () => {
    //simple if-else for which header to display
    if (isLoggedIn) {
      return userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}

      <div
        className={`min-h-screen pt-32 p-8 text-foreground ${nunito.className}`}
        style={{
          backgroundImage: `url('/landscape_pond_trees_clouds_mountains_reflection_water_landscape_wallpaper_background_4k_hd_nature-1920x1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >

      
      <div className="max-w-7xl mx-auto space-y-12">
      <div className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-primary mb-4">
            My Events
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            Here you can see all the events that you have signed up for and cancel any events you will no longer be attending.
          </p>
        </div>
      </div>

          {/*grid of events here*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentEvents.map((event) => (
              <EventCard key={event._id} event={event} router={router} />
            ))}
          </div>

          {/*page control (pagination)*/}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

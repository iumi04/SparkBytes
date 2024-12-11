'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Button } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";
import EventCard from "../../components/EventCard";
import { Event } from '../../types/types';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ManageEvents() {
  const { isLoggedIn, userType, userId } = useUser(); 
  console.log("userId:" + userId);
  const router = useRouter();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  useEffect(() => {
    if (!isLoggedIn || userType?.toLowerCase() !== 'event organizer') {
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events");
        const data = await response.json();
        const filteredEvents = data.filter((event: Event) => event.created_by === userId);
        
        // Sort events by date (latest first) and then by time (earliest first)
        const sortedEvents = filteredEvents.sort((a: Event, b: Event) => {
          const dateA = new Date(`${a.date}T${a.startTime}`);
          const dateB = new Date(`${b.date}T${b.startTime}`);
          return dateB.getTime() - dateA.getTime(); // Sort by date descending
        });
        
        setUserEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = userEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(userEvents.length / eventsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderHeader = () => {
    if (isLoggedIn) {
      return userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}

      <div
        className={`min-h-screen pt-32 p-8 bg-cover bg-center ${nunito.className}`}
        style={{
          backgroundImage: `url('/landscape_pond_trees_clouds_mountains_reflection_water_landscape_wallpaper_background_4k_hd_nature-1920x1080.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Title with Background Box */}
          <div className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-primary mb-4">
                Manage Events
              </h1>
              <p className="text-lg max-w-2xl mx-auto mb-12">
                Here you can manage your events, add new ones, or edit existing events.
              </p>
            </div>
          </div>

          {/* Add Event Button with gap from the background box */}
          <div className="text-center mb-16">
            <Button 
              as="a"
              href="/frontend/pages/add-event" // Link to the Add Event page
              color="primary" 
              className="text-lg py-2 px-6 rounded-full"
            >
              Add Event
            </Button>
          </div>

          {/* Your Events Section */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentEvents.map((event) => (
                <EventCard key={event.id} event={event} router={router} />
              ))}
            </div>
            {/* Pagination Controls */}
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
      </div>
      <Foot />
    </>
  );
}

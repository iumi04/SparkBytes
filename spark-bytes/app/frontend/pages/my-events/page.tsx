'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Image, Button, Spinner, Pagination } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";
import UserEventCard from "../../components/UserEventCard";
import { Event } from "../../types/types";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});



export default function MyEvents() {
  const { isLoggedIn, userType, userId } = useUser(); 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 
  const [events, setEvents] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const handleCancelRegistration = async (eventId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/cancel_registration/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userId }),
      });
  
      if (response.ok) {
        // Remove the event from the local state
        setEvents(events.filter(event => event.id.toString() !== eventId));
        alert('Registration cancelled successfully');
      } else {
        alert('Failed to cancel registration');
      }
    } catch (error) {
      console.error('Error cancelling registration:', error);
      alert('Error cancelling registration');
    }
  };

  useEffect(() => {
    //if they arent logged in they should not be able to access this page
    if (!isLoggedIn) {
        alert("You are not allowed to view this page.");
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const eventsData = await response.json();
          // Filter events here inside the useEffect
          const filtered = eventsData.filter((event: Event) => 
            userId && Array.isArray(event.signed_up_by) && event.signed_up_by.includes(String(userId))
          );
          
          // Sort events here
          const sorted = filtered.sort((a: Event, b: Event) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);

            // First compare dates in descending order
            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;

            // If dates are the same, compare times in ascending order
            return dateA.getTime() - dateB.getTime();
          });
          
          setEvents(sorted);
        } else {
          console.error("failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [userId]);

  // Remove these lines as they're now handled in the useEffect
  // const filteredEvents = events.filter((event: Event) => ...
  // console.log("filteredEvents: "+filteredEvents );
  // setEvents(filteredEvents);
  // const sortedEvents = filteredEvents.sort((a, b) => ...

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

          {/* Loading or Events Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {currentEvents.map((event) => (
                <UserEventCard 
                  key={event.id} 
                  event={event}
                  onCancelRegistration={handleCancelRegistration}
                  />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <Pagination
              showShadow
              showControls
              total={totalPages}
              data-active-page={currentPage}
              onChange={handlePageChange}
            />
          </div>

        </div>
      </div>
      <Foot />
    </>
  );
}

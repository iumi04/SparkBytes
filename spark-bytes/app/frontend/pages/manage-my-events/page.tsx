'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";

import { Button, Pagination, Spinner } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";

// custom event card with modify and delete event buttons
import OrganizerEventCard from "../../components/OrganizerEventCard"; 

import { Event } from '../../types/types';

// custom modal that pops up when the user clicks modify event
import ModifyEventModal from "../../components/ModifyEventModal";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ManageEvents() {
  const { isLoggedIn, userType, userId } = useUser();  // load context
  const router = useRouter();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9; 
  const [modalVisible, setModalVisible] = useState(false); // modal visibility (modify event)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // to see which event to modify
  const [isLoading, setIsLoading] = useState(true);

  // check if the user is logged in as the correct user type. If not, push them to the home page.
  useEffect(() => {
    // Wait for authentication to be determined
    if (isLoggedIn === undefined || userType === undefined) {
      return;
    }

    if (!isLoggedIn) {
      router.push('/');
    } else if (userType && userType.toLowerCase() !== 'event organizer') {
      router.push('/');
    } else if (isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoggedIn, userType, router]);

  // fetch events data from the backend, then sort by date
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events");
        const data = await response.json();
        const filteredEvents = data.filter((event: Event) => event.created_by === userId);
        
        //used to sort events by date (latest first) and then by time (earliest first)
        const sortedEvents = filteredEvents.sort((a: Event, b: Event) => {
          const dateA = new Date(`${a.date}T${a.startTime}`);
          const dateB = new Date(`${b.date}T${b.startTime}`);
          return dateB.getTime() - dateA.getTime(); //sort by date descending
        });
        
        setUserEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  // spinner animation if the site is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spinner 
          size="lg"
          color="primary"
          label="Loading..."
        />
      </div>
    );
  }

  // for pagination purposes
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = userEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(userEvents.length / eventsPerPage);

  //page change make sure it works
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // render header depending on the type of user
  const renderHeader = () => {
    if (isLoggedIn) {
      //same logic as my events, appropriate header
      return userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />;
    }
    return <Header />;
  };

  // handle when the user clicks modify event
  const handleModifyClick = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  // handle when the user deletes an event
  const handleDeleteEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Event deleted successfully!");
      setUserEvents((prevEvents) => prevEvents.filter((event) => event.id.toString() !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event.");
    }
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
          <div className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-primary mb-4">
                Manage Events
              </h1>
              <p className="text-lg max-w-2xl mx-auto mb-12">
                Here you can manage your events. Add new ones, or edit existing events!
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <Button 
              as="a"
              href="/frontend/pages/add-event" 
              color="primary" 
              className="text-lg py-2 px-6 rounded-full"
            >
              Add Event
            </Button>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentEvents.map((event) => (
                <OrganizerEventCard 
                  key={event.id} 
                  event={event} 
                  onModify={() => handleModifyClick(event)} 
                  onDelete={handleDeleteEvent} 
                />
              ))}
            </div>

            {/* Replace the old pagination with NextUI Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                showShadow
                showControls
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Foot />
      <ModifyEventModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        event={selectedEvent} 
      />
    </>
  );
}

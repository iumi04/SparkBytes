'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Image, Button, Modal } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ManageEvents() {
  const { isLoggedIn, userType } = useUser(); 
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); 

  useEffect(() => {
    if (!isLoggedIn || userType?.toLowerCase() !== 'event organiser') {
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

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

  // Inside your ManageEvents component
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
        </div>
      </div>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <Modal open={isModalOpen} onClose={closeModal}>
          <Modal.Header>
            <h3>{selectedEvent.title}</h3>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p>{selectedEvent.details}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Foot />
    </>
  );
}

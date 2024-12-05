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

export default function AttendEvents() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); // State to hold events
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Event details for modal

  // Check user type on component mount
  useEffect(() => {
    if (!isLoggedIn || userType?.toLowerCase() !== 'student') {
      alert("You must be logged in to view this page.");
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events"); // this url must be changed
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}

      <div className="min-h-screen pt-32 p-8 bg-background text-foreground"> 
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-primary mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-12">
              Check out the upcoming events where you can attend and claim free food!
            </p>
          </div>

          {/* Events Grid */}
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
                  <h2 className="text-2xl font-semibold text-primary mb-2">{event.title}</h2>
                  <p className="text-lg mb-4">{event.description}</p>
                  <Button 
                    onClick={() => openModal(event)} 
                    color="primary" 
                    className="text-lg py-2 px-6 rounded-full"
                  >
                    View Event Details
                  </Button>
                </div>
              </div>
            ))}
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
        </Modal>
      )}
    </>
  );
}

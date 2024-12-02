"use client"; 

import { useUser } from '../../context/UserContext'; // Import useUser
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader"; // Import StudentHeader
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; // Import EventOrganizerHeader
import Foot from "../../components/Foot";
import { Image, Modal, Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Nunito } from 'next/font/google';
import AddEvent from "../addevent/page";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Events() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Free Pizza Party",
      description: "Join us for a pizza party after the seminar! Leftover pizza will be available for pickup.",
      date: "2024-11-20",
      location: "BU Seminar Hall"
    },
    {
      id: 2,
      title: "Lunch Donation from Tech Conference",
      description: "Leftover sandwiches and snacks from a tech conference. Grab your lunch here!",
      date: "2024-11-22",
      location: "BU Conference Center"
    },
    {
      id: 3,
      title: "Post-Event Dessert Grab",
      description: "Delicious desserts from the university event. Come get some free sweets!",
      date: "2024-11-25",
      location: "BU Dining Hall"
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.date && newEvent.location) {
      const newEventData = {
        ...newEvent,
        id: events.length + 1, 
      };
      setEvents([...events, newEventData]);
      setIsModalOpen(false); 
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: ""
      }); 
    }
  };

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
        <div className="flex flex-col w-full max-w-5xl space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-primary mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Check out the upcoming events at Boston University where you can donate or claim free food!
            </p>
          </div>

          {/* Add Event Button */}
          <Button 
            as="a" // Use 'as' prop to render as an anchor tag
            href="/frontend/pages/addevent" 
            className="padding: 10px 20px; font-size: 16px; cursor: pointer;"
          >
            Add Event
          </Button>


          {/* Events List */}
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-1">
                    <Image
                      className="dark:invert rounded-lg object-cover object-center"
                      src="/spark_bytes.jpeg" 
                      alt={event.title}
                      width="100%"
                      height="auto"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-primary mb-2">{event.title}</h2>
                    <p className="text-lg mb-4">{event.description}</p>
                    <p className="text-sm text-gray-400 mb-2">Date: {event.date}</p>
                    <p className="text-sm text-gray-400 mb-4">Location: {event.location}</p>
                    <a
                      href={`/event/${event.id}`} 
                      className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300"
                    >
                      Claim Food
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      { /* 
      {/* Modal for Adding Event *}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <h3>Add New Event</h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            fullWidth
            label="Event Title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <Textarea
            fullWidth
            label="Description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-4"
          />
          <Input
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="mt-4"
          />
          <Input
            fullWidth
            label="Location"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="mt-4"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button auto onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
      */}

      <Foot />
    </>
  );
}

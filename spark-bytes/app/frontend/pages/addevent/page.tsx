'use client';

import { useUser } from '../../context/UserContext'; // Import useUser for user context
import Header from "../../components/Header";
import Foot from "../../components/Foot";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddEvent() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context
  const router = useRouter();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    // Redirect to events page if the user is not an event organizer
    if (!isLoggedIn || userType !== 'eventOrganizer') {
      router.push('/frontend/pages/events'); // Redirect to events page if not an event organizer
    }
  }, [isLoggedIn, userType, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      newEvent.title &&
      newEvent.description &&
      newEvent.date &&
      newEvent.location
    ) {
      console.log("New Event Created:", newEvent);
      alert("Event successfully created!");
      router.push("/frontend/pages/events"); // Redirects back to events page
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (!isLoggedIn || userType !== 'event_organiser') {
    return null; // Don't render anything if not a student
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
        <div className="flex flex-col w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
            Add New Event
          </h1>

          {/* Event Form */}
          <div className="space-y-4">
            <Input
              fullWidth
              label="Event Title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
            />
            <Textarea
              fullWidth
              label="Description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the event details"
            />
            <Input
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              label="Location"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <Button color="success" onClick={handleSubmit}>
              Create Event
            </Button>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

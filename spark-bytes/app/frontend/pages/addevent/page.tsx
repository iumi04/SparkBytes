'use client';

import Header from "../../components/Header";
import Foot from "../../components/Foot";
import { Input, Textarea, Button, Checkbox } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Nunito } from 'next/font/google'; // Import Nunito font
import { useUser } from '../../context/UserContext'; 
import StudentHeader from '../../components/StudentHeader';
import EventOrganizerHeader from '../../components/EventOrganizerHeader';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function AddEvent() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context
  const router = useRouter();
  
  const [loading, setLoading] = useState(true); // Add loading state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: [],
  });

  const tagOptions = [
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Seafood",
    "Meat",
  ];

  useEffect(() => {
    // Check user state and set loading to false after checking
    const checkUserState = () => {
      if (isLoggedIn !== null) {
        setLoading(false);
      }
    };
    checkUserState();
  }, [isLoggedIn]);

  // Check access after loading is complete
  useEffect(() => {
    // Redirect to events page if the user is not an event organizer
    if (!loading) {
      if (!isLoggedIn || userType?.toLowerCase() !== 'event organiser') {
        router.push('/frontend/pages/events'); // Redirect to events page if not an event organizer
      }
    }
  }, [loading, isLoggedIn, userType, router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setNewEvent((prevState) => {
      const newTags = isChecked
        ? [...prevState.tags, tag]
        : prevState.tags.filter((t) => t !== tag);

      return { ...prevState, tags: newTags };
    });
  };

  const handleSubmit = () => {
    if (
      newEvent.title &&
      newEvent.description &&
      newEvent.date &&
      newEvent.location &&
      newEvent.tags.length > 0
    ) {
      console.log("New Event Created:", newEvent);
      alert("Event successfully created!");
      router.push("/frontend/pages/events"); // Redirects back to events page
    } else {
      alert("Please fill in all fields.");
    }
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
      
      <div className={`flex items-center justify-center min-h-screen p-8 bg-background text-foreground ${nunito.className}`}>
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
            <div>
              <h1 className="text-lg font-medium text-primary">Event Tags:</h1>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tagOptions.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={tag}
                      checked={newEvent.tags.includes(tag)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleTagChange(tag, isChecked);
                      }}
                    />
                    <span className="text-white">{tag}</span>
                  </label>
                ))}
            </div>
          </div>
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

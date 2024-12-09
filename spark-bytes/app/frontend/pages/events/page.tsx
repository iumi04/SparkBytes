'use client';

import { useUser } from '../../context/UserContext'; 
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Image, Button, Modal } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Nunito } from 'next/font/google';
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from 'react-icons/io'; // Importing the arrow icon from react-icons

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Events() {
  const { isLoggedIn, userType } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); // Initialize as empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
        const response = await fetch("http://127.0.0.1:5000/get_events"); // Replace with actual URL
        const data = await response.json();

        // Ensure the fetched data is an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters to events
  const filteredEvents = events.filter((event) => {
    // Filter by location
    const locationMatch = selectedLocation ? event.location === selectedLocation : true;

    // Filter by food preferences
    const foodPreferenceMatch = selectedFoodPreferences.length
      ? selectedFoodPreferences.every((preference) => event.foodPreferences.includes(preference))
      : true;

    return locationMatch && foodPreferenceMatch;
  });

  return (
    <>
      {isLoggedIn ? (
        userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />
      ) : (
        <Header />
      )}

      <div className={`min-h-screen pt-32 p-8 bg-background text-foreground ${nunito.className}`}>
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className={`text-4xl font-semibold text-primary mb-4`}>Upcoming Events</h1>
            <p className={`text-lg max-w-2xl mx-auto mb-12`}>
              Check out the upcoming events at Boston University where you can donate or claim free food!
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex justify-start mb-8">
            {/* Filter Button with Arrow */}
            <Button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              color="primary"
              className="text-lg py-2 px-6 rounded-full mr-8 flex items-center"
            >
              Filter
              <IoIosArrowDown className="ml-2 text-lg" />
            </Button>

            {/* Dropdowns for Location and Food Preferences */}
            {isFilterVisible && (
              <div className="bg-black p-4 rounded-md shadow-md space-y-4 text-white w-[300px] mt-2">
                {/* Container for both dropdowns in a row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Location Dropdown */}
                  <div>
                    <p className="font-bold mb-2">Location</p>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    >
                      <option value="">Select Location</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                      <option value="Central">Central</option>
                    </select>
                  </div>

                  {/* Food Preferences Dropdown */}
                  <div>
                    <p className="font-bold mb-2">Food Preferences</p>
                    <div className="space-y-2">
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Vegan"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Vegan"] : prev.filter((p) => p !== "Vegan")
                            );
                          }}
                        />
                        Vegan
                      </label>
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Dairy Free"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Dairy Free"] : prev.filter((p) => p !== "Dairy Free")
                            );
                          }}
                        />
                        Dairy Free
                      </label>
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Nut Free"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Nut Free"] : prev.filter((p) => p !== "Nut Free")
                            );
                          }}
                        />
                        Nut Free
                      </label>
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Gluten Free"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Gluten Free"] : prev.filter((p) => p !== "Gluten Free")
                            );
                          }}
                        />
                        Gluten Free
                      </label>
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Seafood"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Seafood"] : prev.filter((p) => p !== "Seafood")
                            );
                          }}
                        />
                        Seafood
                      </label>
                      <label className="block">
                        <input
                          type="checkbox"
                          value="Meat"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedFoodPreferences((prev) =>
                              checked ? [...prev, "Meat"] : prev.filter((p) => p !== "Meat")
                            );
                          }}
                        />
                        Meat
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-md flex flex-col h-auto">
                <div className="flex-1 mb-4">
                  <Image
                    className="dark:invert rounded-lg object-cover object-center"
                    src="/spark_bytes.jpeg" 
                    alt={event.title}
                    width="100%"
                    height="150px"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left mb-4">
                  <h2 className="text-2xl font-semibold text-primary mb-2">{event.title}</h2>
                  <p className="text-lg mb-4">{event.description}</p>
                  <p className="text-sm text-gray-400 mb-2">Date: {event.date}</p>
                  <p className="text-sm text-gray-400 mb-4">Location: {event.location}</p>
                </div>
                <div className="flex justify-between mt-auto">
                  <a
                    href={`/event/${event.id}`} 
                    className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300"
                  >
                    Claim Food
                  </a>
                  <Button
                    className="bg-green-500 text-white py-2 px-6 rounded-full text-lg hover:bg-green-600 transition duration-300"
                    onClick={() => openModal(event)}
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

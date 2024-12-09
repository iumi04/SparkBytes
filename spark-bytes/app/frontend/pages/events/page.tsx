'use client';

import { useUser } from '../../context/UserContext'; 
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Image, Button, Modal, Spinner, Pagination } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Nunito } from 'next/font/google';
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from 'react-icons/io'; // Importing the arrow icon from react-icons
import EventCard from '../../components/EventCard';
import axios from 'axios'; // Import axios for making HTTP requests

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Mock events for testing
const mockEvents = [
  {
    id: 1,
    title: "Sample Event 1",
    date: "2024-12-01T00:00:00Z",
    description: "This is the first sample event description.",
    location: "Sample Location 1",
    area: "Sample Area 1",
    tags: ["tag1", "tag2"],
    image_url: "https://example.com/sample-image1.jpg",
  },
  {
    id: 2,
    title: "Sample Event 2",
    date: "2024-12-02T00:00:00Z",
    description: "This is the second sample event description.",
    location: "Sample Location 2",
    area: "Sample Area 2",
    tags: ["tag3", "tag4"],
    image_url: "https://example.com/sample-image2.jpg",
  },
  {
    id: 3,
    title: "Sample Event 3",
    date: "2024-12-03T00:00:00Z",
    description: "This is the third sample event description.",
    location: "Sample Location 3",
    area: "Sample Area 3",
    tags: ["tag5", "tag6"],
    image_url: "https://example.com/sample-image3.jpg",
  },
  {
    id: 4,
    title: "Sample Event 4",
    date: "2024-12-04T00:00:00Z",
    description: "This is the fourth sample event description.",
    location: "Sample Location 4",
    area: "Sample Area 4",
    tags: ["tag7", "tag8"],
    image_url: "https://example.com/sample-image4.jpg",
  },
  {
    id: 5,
    title: "Sample Event 5",
    date: "2024-12-05T00:00:00Z",
    description: "This is the fifth sample event description.",
    location: "Sample Location 5",
    area: "Sample Area 5",
    tags: ["tag9", "tag10"],
    image_url: "https://example.com/sample-image5.jpg",
  },
  {
    id: 6,
    title: "Sample Event 6",
    date: "2024-12-06T00:00:00Z",
    description: "This is the sixth sample event description.",
    location: "Sample Location 6",
    area: "Sample Area 6",
    tags: ["tag11", "tag12"],
    image_url: "https://example.com/sample-image6.jpg",
  },
  {
    id: 7,
    title: "Sample Event 7",
    date: "2024-12-07T00:00:00Z",
    description: "This is the seventh sample event description.",
    location: "Sample Location 7",
    area: "Sample Area 7",
    tags: ["tag13", "tag14"],
    image_url: "https://example.com/sample-image7.jpg",
  },
  {
    id: 8,
    title: "Sample Event 8",
    date: "2024-12-08T00:00:00Z",
    description: "This is the eighth sample event description.",
    location: "Sample Location 8",
    area: "Sample Area 8",
    tags: ["tag15", "tag16"],
    image_url: "https://example.com/sample-image8.jpg",
  },
  {
    id: 9,
    title: "Sample Event 9",
    date: "2024-12-09T00:00:00Z",
    description: "This is the ninth sample event description.",
    location: "Sample Location 9",
    area: "Sample Area 9",
    tags: ["tag17", "tag18"],
    image_url: "https://example.com/sample-image9.jpg",
  },
];

export default function Events() {
  const { isLoggedIn, userType } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>(mockEvents); // Initialize with mock events
  const [isLoading, setIsLoading] = useState(true); // Loading state
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

  //NEED TO UPDATE THIS TO FETCH FROM THE DATABASE LAER ON
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); // Set loading to true before fetching
      // Simulate fetching events
      setTimeout(() => {
        setEvents(mockEvents);
        setIsLoading(false); // Set loading to false after fetching
      }, 2000); // Simulate a 2-second loading time
    };

    fetchEvents();
  }, []);

  //apply filters to events
  const filteredEvents = events.filter((event) => {
    //filter by location
    const locationMatch = selectedLocation ? event.location === selectedLocation : true;

    //filter by food preferences
    const foodPreferenceMatch = selectedFoodPreferences.length
      ? selectedFoodPreferences.every((preference) => event.foodPreferences.includes(preference))
      : true;

    return locationMatch && foodPreferenceMatch;
  });

  const [currentPage, setCurrentPage] = useState(1); //state for current page
  const eventsPerPage = 3; //number of events per page

  //calculate the index of the first and last event on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent); // Get current events

  //calculate total pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Handler for page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

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

          {/* Loading Animation or Events Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64"> {/* Center the spinner */}
              <Spinner size="xl" /> {/* Display the loading spinner */}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {currentEvents.map((event) => (
                <EventCard key={event.id} event={event} router={router} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <Pagination
              showShadow
              showControls // Show pagination controls
              total={totalPages} // Total number of pages
              data-active-page={currentPage} // Current active page
              onChange={handlePageChange} // Update current page on change
            />
          </div>
        </div>
      </div>

      <Foot />
    </>
  );
}

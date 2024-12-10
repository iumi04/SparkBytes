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
import { IoIosArrowDown } from 'react-icons/io'; 
import EventCard from '../../components/EventCard';

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
    area: "South",
    tags: ["Vegan", "Gluten Free"],
    image_url: "https://example.com/sample-image1.jpg",
  },
  {
    id: 2,
    title: "Sample Event 2",
    date: "2024-12-02T00:00:00Z",
    description: "This is the second sample event description.",
    location: "Sample Location 2",
    area: "West",
    tags: ["Dairy Free"],
    image_url: "https://example.com/sample-image2.jpg",
  },
  {
    id: 3,
    title: "Sample Event 3",
    date: "2024-12-03T00:00:00Z",
    description: "This is the third sample event description.",
    location: "Sample Location 3",
    area: "East",
    tags: ["Nut Free", "Seafood"],
    image_url: "https://example.com/sample-image3.jpg",
  },
  {
    id: 4,
    title: "Sample Event 4",
    date: "2024-12-04T00:00:00Z",
    description: "This is the fourth sample event description.",
    location: "Sample Location 4",
    area: "Central",
    tags: ["Meat", "Vegan"],
    image_url: "https://example.com/sample-image4.jpg",
  },
  {
    id: 5,
    title: "Sample Event 5",
    date: "2024-12-05T00:00:00Z",
    description: "This is the fifth sample event description.",
    location: "Sample Location 5",
    area: "South",
    tags: [],
    image_url: "https://example.com/sample-image5.jpg",
  },
  {
    id: 6,
    title: "Sample Event 6",
    date: "2024-12-06T00:00:00Z",
    description: "This is the sixth sample event description.",
    location: "Sample Location 6",
    area: "West",
    tags: ["Gluten Free", "Seafood"],
    image_url: "https://example.com/sample-image6.jpg",
  },
  {
    id: 7,
    title: "Sample Event 7",
    date: "2024-12-07T00:00:00Z",
    description: "This is the seventh sample event description.",
    location: "Sample Location 7",
    area: "East",
    tags: ["Vegan", "Dairy Free"],
    image_url: "https://example.com/sample-image7.jpg",
  },
  {
    id: 8,
    title: "Sample Event 8",
    date: "2024-12-08T00:00:00Z",
    description: "This is the eighth sample event description.",
    location: "Sample Location 8",
    area: "Central",
    tags: ["Nut Free"],
    image_url: "https://example.com/sample-image8.jpg",
  },
  {
    id: 9,
    title: "Sample Event 9",
    date: "2024-12-09T00:00:00Z",
    description: "This is the ninth sample event description.",
    location: "Sample Location 9",
    area: "South",
    tags: ["Meat", "Gluten Free"],
    image_url: "https://example.com/sample-image9.jpg",
  },
];

export default function Events() {
  const { isLoggedIn, userType } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 


  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  //NEED TO UPDATE THIS TO FETCH FROM THE DATABASE LAER ON
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/get_events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const eventsData = await response.json();
          setEvents(eventsData); 
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false); 
      }
    };
  
    fetchEvents();
  }, []);
  


  const filteredEvents = events.filter((event) => {

    const areaMatch = selectedArea ? event.area === selectedArea : true;


    const foodPreferenceMatch = selectedFoodPreferences.length
      ? selectedFoodPreferences.every((preference) => event.tags.includes(preference))
      : true;

    return areaMatch && foodPreferenceMatch;
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const eventsPerPage = 9; 


  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent); 


  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);


  const handlePageChange = (page: number) => {
    setCurrentPage(page); 
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
              <IoIosArrowDown />
            </Button>

            {/* Dropdowns for Location and Food Preferences */}
            {isFilterVisible && (
              <div className="bg-black p-4 rounded-md shadow-md space-y-4 text-white w-[300px] mt-2">
                {/* Container for both dropdowns in a row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Location Dropdown */}
                  <div>
                    <p className="font-bold mb-2">Area</p>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    >
                      <option value="">Select Area</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                      <option value="Central">Central</option>
                      <option value="Central">Else</option>
                    </select>
                  </div>

                  {/* Food Preferences Dropdown */}
                  <div>
                    <p className="font-bold mb-2">Food Preferences</p>
                    <div className="space-y-2">
                      {["Vegan", "Dairy Free", "Nut Free", "Gluten Free", "Seafood", "Meat"].map((preference) => (
                        <label className="block" key={preference}>
                          <input
                            type="checkbox"
                            value={preference}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSelectedFoodPreferences((prev) =>
                                checked ? [...prev, preference] : prev.filter((p) => p !== preference)
                              );
                            }}
                          />
                          {preference}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Loading Animation or Events Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64"> {/* Center the spinner */}
              <Spinner size="lg" /> {/* Display the loading spinner */}
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

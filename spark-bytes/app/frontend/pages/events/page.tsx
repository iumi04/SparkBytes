'use client';

import { useUser } from '../../context/UserContext'; 
import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import Foot from "../../components/Foot";
import { Button, Modal, Spinner, Pagination } from "@nextui-org/react";
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
  // Mock events as provided
];

export default function Events() {
  const { isLoggedIn, userType } = useUser();
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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

      {/* Main Content */}
      <div className={`min-h-screen pt-32 p-8 bg-cover bg-center text-foreground ${nunito.className}`} 
        style={{ backgroundImage: "url('/thumb-1920-666439.jpg')" }}>

        <div className="max-w-7xl mx-auto space-y-12">

          {/* Smaller and Nicer Textbox for Upcoming Events Section */}
          <div className="bg-gray-800 bg-opacity-90 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-semibold mb-3">Upcoming Events</h1>
              <p className="text-md max-w-2xl mx-auto mb-6">
                Check out the upcoming events at Boston University where you can donate or claim free food!
              </p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex justify-start mb-8">
            <Button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              color="primary"
              className="text-lg py-2 px-6 rounded-full mr-8 flex items-center"
            >
              Filter
              <IoIosArrowDown />
            </Button>

            {isFilterVisible && (
              <div className="bg-white p-4 rounded-md shadow-md space-y-4 text-black w-[300px] mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold mb-2">Area</p>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full p-2 border border-black-300 rounded-md bg-white-800 text-black"
                    >
                      <option value="">Select Area</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                      <option value="Central">Central</option>
                      <option value="Central">Else</option>
                    </select>
                  </div>

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

          {/* Loading or Events Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
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

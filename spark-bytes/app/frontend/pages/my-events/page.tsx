'use client';

import Header from "../../components/Header";
import StudentHeader from "../../components/StudentHeader";
import EventOrganizerHeader from "../../components/EventOrganizerHeader"; 
import { useState, useEffect } from "react";
import EventCard from '../../components/EventCard';
import { Spinner } from "@nextui-org/react";
import { useUser } from '../../context/UserContext'; 
import { useRouter } from "next/navigation";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '700'],
  });  

const mockUserEvents = [
  {
    id: 1,
    title: "My Event 1",
    date: "2024-12-01T00:00:00Z",
    start_time: "2024-12-01T10:00:00Z",
    end_time: "2024-12-01T12:00:00Z",
    description: "Description for My Event 1.",
    location: "Location 1",
    area: "South",
    tags: ["Vegan", "Gluten Free"],
    image_url: "https://example.com/sample-image1.jpg",
  },
  {
    id: 2,
    title: "My Event 2",
    date: "2024-12-02T00:00:00Z",
    start_time: "2024-12-02T11:00:00Z",
    end_time: "2024-12-02T13:00:00Z",
    description: "Description for My Event 2.",
    location: "Location 2",
    area: "West",
    tags: ["Dairy Free"],
    image_url: "https://example.com/sample-image2.jpg",
  },
];

export default function MyEvents() {
  const [userEvents, setUserEvents] = useState<any[]>(mockUserEvents);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, userType } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || userType?.toLowerCase() !== 'event organiser') {
        alert("You are not allowed to view this page.");
        router.push('/');
    }
  }, [isLoggedIn, userType, router]);

  useEffect(() => { //change this to the 
    const fetchUserEvents = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };

    fetchUserEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {userEvents.map((event) => (
            <EventCard key={event.id} event={event} router={router} />
          ))}
        </div>
      )}
    </div>
  );
}

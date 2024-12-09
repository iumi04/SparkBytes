/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Event } from "../types/types";
import image404 from "../assets/default.jpg";
import { useUser } from '../context/UserContext';
import { Nunito } from "next/font/google";

interface EventCardProps {
  event: Event;
  router: any;
}

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const EventCard: React.FC<EventCardProps> = ({ event, router }) => {
  const formattedDate = new Date(event.date).toLocaleDateString();
  const { isLoggedIn } = useUser();

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("You must sign in to sign up for events.");
      router.push("/frontend/pages/login");
    } else {
      alert(`Signed up for ${event.title}`);
    }
  };

  return (
    <div 
      style={{
        width: "100%", 
        maxWidth: "350px", // Adjust card width for better responsiveness
        height: "500px", // Fixed height for all cards to ensure they are of the same size
        margin: "15px", // Space between cards
        transition: "all 0.3s ease"
      }} 
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <Card
        isHoverable
        className="rounded-lg shadow-xl dark:bg-gray-800 bg-white" // Dark and light mode support for card background
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <h4 className={`text-lg font-semibold text-black truncate dark:text-white ${nunito.className}`}>
              {event.title}
            </h4>
            <span className={`text-sm font-normal text-gray-600 dark:text-gray-400 ${nunito.className}`}>
              {formattedDate}
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <img 
            src={event.image_url || image404.src} 
            alt={event.title}
            onError={(e) => { e.currentTarget.src = image404.src; }}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <p className={`text-black dark:text-white ${nunito.className} mb-2`}>{event.description}</p>
          <p className={`text-black dark:text-white ${nunito.className} text-sm`}>Location: {event.location}</p>
          <p className={`text-black dark:text-white ${nunito.className} text-sm`}>Area: {event.area}</p>
          <p className={`text-black dark:text-white ${nunito.className} text-sm`}>Tags: {event.tags ? event.tags.join(", ") : "No tags available"}</p>
        </CardBody>
        <CardFooter>
          <Button 
            className="w-full mt-4 text-white bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;

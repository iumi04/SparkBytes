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
  const formattedStartTime = new Date(`${event.date}T${event.startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = new Date(`${event.date}T${event.endTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const { isLoggedIn } = useUser();

  // console.log("Event Data from here!:", event); 
  // console.log("Event ID:", event.id);

  const handleSignUpClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log("Event data when Sign Up is clicked:", event); 
    console.log("Event ID when Sign Up is clicked:", event.id);

    if (!isLoggedIn) {
      alert("You must sign in to sign up for events.");
      router.push("/frontend/pages/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to sign up for events.");
      router.push("/frontend/pages/login");
      return;
    }

    try {
      const requestData = { event_id: event.id }; 
      console.log("Sending data:", requestData);

      const response = await fetch("http://127.0.0.1:5000/signup_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(requestData), 
      });

      if (response.ok) {
        alert(`Successfully signed up for ${event.title}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to sign up for the event: ${errorData.msg || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error signing up for the event:", error);
      alert("An error occurred while signing up for the event. Please try again.");
    }
  };

  return (
    <div 
      style={{ 
        width: "29.5vw",
        margin: "10px", 
        transition: "all 0.3s ease" 
      }}
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <Card
        isHoverable
        className="height h-auto"
      >
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className={`max-w-20vw overflow-hidden text-ellipsis text-black ${nunito.className}`}>
              {event.title}
            </h4>
            <span className={`ml-2 font-normal text-black ${nunito.className}`}>
              {formattedDate}
            </span>
          </div>
        </CardHeader>
        <CardBody>
          <img 
            src={event.image_url || image404.src} 
            alt={event.title}
            onError={(e) => {
              e.currentTarget.src = image404.src;
            }}
            style={{ height: "40vh", objectFit: "cover" }}
          />
          <p className={`text-black ${nunito.className}`}>{event.description}</p>
          <p className={`text-black ${nunito.className}`}>Location: {event.location}</p>
          <p className={`text-black ${nunito.className}`}>Area: {event.area}</p>
          <p className={`text-black ${nunito.className}`}>Tags: {event.tags.length ? event.tags.join(", ") : "No tags available"}</p>
          <p className={`text-black ${nunito.className}`}>Start Time: {formattedStartTime}</p>
          <p className={`text-black ${nunito.className}`}>End Time: {formattedEndTime}</p>
        </CardBody>
        <CardFooter>
          <Button 
            className="mt-2 text-black"
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

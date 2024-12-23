import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Event } from "../types/types";
import image404 from "../assets/default.jpg";

interface UserEventCardProps {
  event: Event;
  onCancelRegistration: (eventId: string) => void;
}

const UserEventCard: React.FC<UserEventCardProps> = ({ event, onCancelRegistration }) => {
  const formattedStartTime = new Date(`${event.date}T${event.startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = new Date(`${event.date}T${event.endTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel your registration for this event?")) {
      onCancelRegistration(event.id.toString());
    }
  };

  return (
    <div style={{ width: "29.5vw", margin: "10px" }}>
      <Card isHoverable className="height h-auto">
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 className="max-w-20vw overflow-hidden text-ellipsis text-black">
              {event.title}
            </h4>
            <span className="ml-2 font-normal text-black">
              {new Date(event.date).toLocaleDateString()}
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
          <p className="text-black">{event.description}</p>
          <p className="text-black">Location: {event.location}</p>
          <p className="text-black">Area: {event.area}</p>
          <p className="text-black">Tags: {event.tags.length ? event.tags.join(", ") : "No tags available"}</p>
          <p className="text-black">Start Time: {formattedStartTime}</p>
          <p className="text-black">End Time: {formattedEndTime}</p>
        </CardBody>
        <CardFooter style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button 
            color="danger" 
            className="mt-2 text-white" 
            onClick={handleCancelClick}
          >
            Cancel Registration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserEventCard;
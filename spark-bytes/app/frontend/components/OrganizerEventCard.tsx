/* 
This is another version of the EventCard so event organizers are able to modify or delete 
events. This will be visible on their manage my events page.
*/

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Event } from "../types/types";
import image404 from "../assets/default.jpg";

interface OrganizerEventCardProps {
  event: Event;
  onModify: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

const OrganizerEventCard: React.FC<OrganizerEventCardProps> = ({ event, onModify, onDelete }) => {

    const formattedStartTime = new Date(`${event.date}T${event.startTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = new Date(`${event.date}T${event.endTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
          onDelete(event.id.toString());
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
          <p className={`text-black`}>Start Time: {formattedStartTime}</p>
          <p className={`text-black`}>End Time: {formattedEndTime}</p>
          <p className="text-black">Attendees: {event.signed_up_by?.length || 0}</p>

        </CardBody>
        <CardFooter style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button color="secondary" className="mt-2 text-white" onClick={() => onModify(event.id.toString())}>
            Modify
          </Button>
          <Button color="danger" className="mt-2 text-white" onClick={handleDeleteClick}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizerEventCard; 
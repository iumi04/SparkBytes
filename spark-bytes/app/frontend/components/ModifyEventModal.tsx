import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, ModalContent } from "@nextui-org/react";
import { Event } from "../types/types";

interface ModifyEventModalProps {
  visible: boolean;
  onClose: () => void;
  event: Event | null; // Allow null for initial state
}

const tagOptions = [
  "Vegan",
  "Dairy-Free",
  "Seafood",
  "Gluten-Free",
  "Nut-Free",
  "Meat",
];

const ModifyEventModal: React.FC<ModifyEventModalProps> = ({ visible, onClose, event }) => {
  const [formData, setFormData] = useState<Event | null>(null);

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        tags: event.tags || [], // Ensure tags is initialized as an array
      });
    }
  }, [event]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setFormData((prevData) => {
      const newTags = isChecked
        ? [...prevData!.tags, tag] // Add tag if checked
        : prevData!.tags.filter((t) => t !== tag); // Remove tag if unchecked

      return { ...prevData!, tags: newTags }; // Update tags
    });
  };

  const handleSaveChanges = async () => {
    if (formData) {
      // Ensure event is not null before accessing its properties
      if (!event) {
        alert("Event data is not available.");
        return;
      }

      const token = localStorage.getItem("token");
      console.log("Token being used:", token); // Log the token for debugging

      // Implement the logic to save changes (e.g., API call)
      console.log("Updated Event Data:", formData);
      try {
        const response = await fetch(`http://127.0.0.1:5000/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Updated Event Data:", result);
        alert("Event updated successfully!");
        onClose(); // Close the modal after saving
        window.location.reload();
      } catch (error) {
        console.error("Error while updating event:", error);
        alert("An error occurred while updating the event.");
      }
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Modify Event: {event ? event.title : "Loading..."}</h2>
        </ModalHeader>
        <ModalBody>
          {formData ? (
            <div>
              <Input
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Textarea
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
              <Input
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <Input
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
              />
              <Input
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
              />
              <Input
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <Input
                fullWidth
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              />
              <div>
                {tagOptions.map((tag) => (
                  <label key={tag}>
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={(e) => handleTagChange(tag, e.target.checked)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading event details...</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button className="text-white" color="danger" onClick={onClose}>
            Close
          </Button>
          <Button className="text-white" color="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModifyEventModal; 
'use client';

import Header from "../../components/Header";
import Foot from "../../components/Foot";
import { Input, Textarea, Button, Checkbox} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Nunito } from 'next/font/google'; 
import { useUser } from '../../context/UserContext'; 
import StudentHeader from '../../components/StudentHeader';
import EventOrganizerHeader from '../../components/EventOrganizerHeader';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function AddEvent() {
  const { isLoggedIn, userType } = useUser(); // Get user state from context
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    startTime:"",
    endTime:"",
    location: "",
    tags: [],
    area: "",
    image: null,
  });

  const tagOptions = [
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Seafood",
    "Meat",
  ];

  useEffect(() => {
    const checkUserState = () => {
      if (isLoggedIn !== null) {
        setLoading(false);
      }
    };
    checkUserState();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn || userType?.toLowerCase() !== 'event organiser') {
        router.push('/frontend/pages/events'); 
      }
    }
  }, [loading, isLoggedIn, userType, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewEvent((prevState) => ({
        ...prevState,
        image: file, 
      }));
    }
  };

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setNewEvent((prevState) => {
      const newTags = isChecked
        ? [...prevState.tags, tag]
        : prevState.tags.filter((t) => t !== tag);

      return { ...prevState, tags: newTags };
    });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target
    setNewEvent((prevState) => ({
      ...prevState,
      area: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      newEvent.title &&
      newEvent.description &&
      newEvent.date &&
      newEvent.startTime &&
      newEvent.endTime &&
      newEvent.location &&
      newEvent.tags.length > 0 &&
      newEvent.area
    ) {
      try {
        const formData = new FormData();
        Object.keys(newEvent).forEach((key) => {
          if (key === "tags") {
            formData.append(key, newEvent[key].join(","));
          } else if (key === "image" && newEvent[key]) {
            formData.append(key, newEvent[key]);
          } else {
            formData.append(key, newEvent[key]);
          }
        });
  
        const response = await fetch("http://127.0.0.1:5000/events", {
          method: "POST",
          body: formData, 
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("New Event Created:", result);
  
          alert("Event successfully created!");
          router.push("/frontend/pages/events"); 
        } else {
          const error = await response.json();
          alert(`Failed to create event: ${error.msg || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error while creating event:", error);
        alert("An error occurred while creating the event.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  
  

  const renderHeader = () => {
    if (isLoggedIn) {
      return userType === 'student' ? <StudentHeader /> : <EventOrganizerHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}
      
      <div className={`flex items-center justify-center min-h-screen p-8 bg-background text-foreground ${nunito.className} mt-24`}>
        <div className="flex flex-col w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
            Add New Event
          </h1>

          {/* Event Form */}
          <div className="space-y-4">
            <Input
              fullWidth
              label="Event Title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
            />
            <Textarea
              fullWidth
              label="Description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the event details"
            />
            <Input
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              label="Start Time"
              name="startTime"
              type="time"
              value={newEvent.startTime}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              label="End Time"
              name="endTime"
              type="time"
              value={newEvent.endTime}
              onChange={handleInputChange}
            />
            <Input
              fullWidth
              label="Location"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
            />
            <div className="space-y-4">
              {/* Dropdown for Area Selection */}
              <div>
                <label htmlFor="area" className="text-lg font-medium text-primary">
                  Select The Event Area:
                </label>
                <select
                  id="area"
                  name="area"
                  value={newEvent.area}
                  onChange={handleAreaChange}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                >
                  <option value="" disabled>
                    Select the area on campus
                  </option>
                  <option value="South">South</option>
                  <option value="Central">Central</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="Else">Else</option>
                </select>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium text-primary">Event Tags:</h1>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tagOptions.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={tag}
                      checked={newEvent.tags.includes(tag)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleTagChange(tag, isChecked);
                      }}
                    />
                    <span className="text-white">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="text-lg font-medium text-primary">
                Upload Event Image:
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <Button color="success" onClick={handleSubmit}>
              Create Event
            </Button>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

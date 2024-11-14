import Header from "../components/header";
import Foot from "../components/Foot";
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Events() {
  // Example event data (you would replace this with actual data)
  const events = [
    {
      id: 1,
      title: "Free Pizza Party",
      description: "Join us for a pizza party after the seminar! Leftover pizza will be available for pickup.",
      date: "2024-11-20",
      location: "BU Seminar Hall"
    },
    {
      id: 2,
      title: "Lunch Donation from Tech Conference",
      description: "Leftover sandwiches and snacks from a tech conference. Grab your lunch here!",
      date: "2024-11-22",
      location: "BU Conference Center"
    },
    {
      id: 3,
      title: "Post-Event Dessert Grab",
      description: "Delicious desserts from the university event. Come get some free sweets!",
      date: "2024-11-25",
      location: "BU Dining Hall"
    }
  ];

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
        <div className="flex flex-col w-full max-w-5xl space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-primary mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Check out the upcoming events at Boston University where you can donate or claim free food!
            </p>
          </div>

          {/* Events List */}
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-800 bg-opacity-80 p-6 rounded-2xl shadow-lg backdrop-blur-md">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-1">
                    <Image
                      className="dark:invert rounded-lg object-cover object-center"
                      src="/spark_bytes.jpeg" // You can replace with actual event image if available
                      alt={event.title}
                      width="100%"
                      height="auto"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-primary mb-2">{event.title}</h2>
                    <p className="text-lg mb-4">{event.description}</p>
                    <p className="text-sm text-gray-400 mb-2">Date: {event.date}</p>
                    <p className="text-sm text-gray-400 mb-4">Location: {event.location}</p>
                    <a
                      href={`/event/${event.id}`} // Link to individual event page (you can create dynamic routing for each event)
                      className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300"
                    >
                      Claim Food
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

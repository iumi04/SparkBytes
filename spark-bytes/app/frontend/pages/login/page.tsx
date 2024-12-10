'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useUser } from '../../context/UserContext';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Login() {
  const router = useRouter();
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_type", data.role);
        login(data.role as 'student' | 'event_organiser', data.access_token);

        const fetchUserId = async () => {
          const token = data.access_token;
          try {
            const whoamiResponse = await fetch("http://127.0.0.1:5000/whoami", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (whoamiResponse.ok) {
              const whoamiData = await whoamiResponse.json();
              console.log("Logged-in user ID:", whoamiData.logged_in_user_id);
            } else {
              console.error(
                "Failed to fetch user ID:",
                whoamiResponse.statusText
              );
            }
          } catch (error) {
            console.error("Error fetching user ID:", error);
          }
        };
  
        await fetchUserId();
        router.push("/");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: "url('/16-10227-SKYLINE-006-cropped-compressed-1200x675.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[70%] max-w-md bg-white p-6 rounded-lg shadow-lg border-2 border-black relative">
          {/* Logo on top right */}
          <img 
            src="/Boston-University-Logo.png" 
            alt="Boston University Logo"
            className="absolute top-4 right-4 h-12" 
          />
          {/* Spark! Bytes heading */}
          <Link href="/" className="mt-4 font-nunito font-bold text-4xl text-center text-black"> 
            Spark! Bytes 
          </Link>
          
          <form onSubmit={handleLogin}>
            <Input 
              type="text"
              variant="underlined"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-gray-800"
            />
            <Input 
              type="password"
              color="default"
              variant="underlined"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-800"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Button 
              color="primary" 
              className="mt-4 w-full"
              type="submit"
            >
              Login
            </Button>
          </form>
          
          <div className="flex justify-between mt-5">
            <Link 
              href="/" 
              className="text-black hover:text-blue-400 duration-300 font-nunito"
            >
              Return Home
            </Link>
            <Link 
              href="/frontend/pages/signup"
              className="text-black hover:text-blue-400 duration-300 font-nunito"
            >
              Don't have an account?
            </Link>
          </div>
        </div> 
      </div>  
    </>
  );
}

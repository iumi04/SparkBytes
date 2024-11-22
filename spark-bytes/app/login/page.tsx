'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // Send login request
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token (could use localStorage or context)
        localStorage.setItem("access_token", data.access_token);

        // Redirect to the home page or a protected route
        router.push("/");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[70%] max-w-md bg-white p-6 rounded-lg shadow-md">
        <Link href="/" className="mt-4 font-nunito font-bold text-4xl text-center text-black"> Spark! Bytes </Link>
        <Input 
          type="email"
          variant="underlined"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <div className="flex justify-between mt-5">
          <Link 
            href="/" 
            className="text-black hover:text-blue-400 duration-300 font-nunito"
          >
            Return Home
          </Link>
          <Link 
            href="/signup"
            className="text-black hover:text-blue-400 duration-300 font-nunito"
          >
            Don't have an account?
          </Link>
        </div>
      </div> 
    </div>  
  );
} 
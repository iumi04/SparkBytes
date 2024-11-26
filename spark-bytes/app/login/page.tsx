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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);

        router.push("/");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Link href="/" className="mt-4 font-nunito font-bold text-4xl text-center pt-10"> Spark! Bytes </Link>
      <div className="flex-grow items-center justify-center">
        <div className="w-[70%] mx-auto">
          <Input 
            type="email"
            variant="underlined"
            label="Email"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input 
            type="password"
            variant="underlined"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              className="text-current hover:text-blue-400 duration-300 font-nunito"
            >
              Return Home
            </Link>
            <Link 
              href="/signup"
              className="text-current hover:text-blue-400 duration-300 font-nunito"
            >
              Don't have an account?
            </Link>
          </div>
        </div> 
      </div>
    </div>  
  );
} 
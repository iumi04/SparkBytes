'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";  //import Checkbox for email thingy

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [receiveEmails, setReceiveEmails] = useState(false);  //boolean value for checkbox from google
  const [error, setError] = useState("");

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //make sure all requirements are met else fail
    if (!username || !password || !email) {
      setError("Email, username, and password are required");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role, email, receiveEmails }),  //include receiveEmails state
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful");
        router.push("/frontend/pages/login");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.log("Something went wrong");
      setError((err as Error).message);
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
        <div className="w-[70%] max-w-md bg-white p-6 rounded-lg shadow-lg border-6 border-black relative">
          {/*BU logo on top right */}
          <img 
            src="/Boston-University-Logo.png" 
            alt="Boston University Logo"
            className="absolute top-4 right-4 h-12" 
          />
          {/*Spark! Bytes heading*/}
          <Link href="/" className="mt-4 font-nunito font-bold text-4xl text-center text-black"> 
            Spark! Bytes 
          </Link>
          
          <Input 
            type="email"
            variant="underlined"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            classNames={{
              input: ["text-black/50"]
            }}
          />
          <Input 
            type="text"
            variant="underlined"
            label="Username"
            placeholder="Enter your username"
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
            className="text-black"
          />
          <Input 
            type="password"
            variant="underlined"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="mb-5"
          />

          {/*only one checkbox for receiving emails*/}
          <div className="mb-5 flex items-center">
            <Checkbox 
              checked={receiveEmails} 
              onChange={(e) => setReceiveEmails(e.target.checked)} 
              color="primary"
              className="text-black"
            />
            <label htmlFor="receiveEmails" className="ml-2 text-sm text-black">
              I would like to receive emails about events
            </label>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full">Register as: {role.charAt(0).toUpperCase() + role.slice(1)}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select Role">
              <DropdownItem key="student" className="text-black" onClick={() => setRole("student")}>Student</DropdownItem>
              <DropdownItem key="event-organizer" className="text-black" onClick={() => setRole("event Organizer")}>Event Organizer</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button 
            color="primary" 
            className="mt-4 w-full"
            onClick={handleSignup}
          >
            Signup
          </Button>

          {error && <p className="mt-3 text-red-500 text-center">{error}</p>}

          <div className="flex justify-between mt-5">
            <Link 
              href="/" 
              className="text-black hover:text-blue-400 duration-300 font-nunito"
            >
              Return Home
            </Link>
            <Link 
              href="/frontend/pages/login"
              className="text-black hover:text-blue-400 duration-300 font-nunito"
            >
              Already have an account?
            </Link>
          </div>
        </div> 
      </div>  
    </>
  );
}

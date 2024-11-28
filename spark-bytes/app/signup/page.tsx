'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Nunito } from 'next/font/google';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !password || !confirmpassword) {
      setError("Email and password are required");
      return;
    }

    // Make sure that the password is typed matches with confirm password
    if (password !== confirmpassword) {
      setError("Please make sure the password you enter both times are the same");
      return;
    }

    // Send signup request
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page on success
        router.push("/login");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <>
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
            className="text-black"
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
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-full">Register as: {role.charAt(0).toUpperCase() + role.slice(1)}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select Role">
              <DropdownItem className="text-black" onClick={() => setRole("Student")}>Student</DropdownItem>
              <DropdownItem className="text-black" onClick={() => setRole("Event Organiser")}>Event Organiser</DropdownItem>
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
              href="/login"
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
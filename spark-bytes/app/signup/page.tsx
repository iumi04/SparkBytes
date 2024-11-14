'use client';

import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/react"
import { Nunito } from 'next/font/google';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Signup() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container for vertical layout */}
            <Link href="/" className="mt-4 font-nunito font-bold text-4xl text-center pt-10"> Spark! Bytes </Link>
      <div className="flex-grow items-center justify-center"> {/* Center the input div vertically */}
        <div className="w-[70%] mx-auto"> {/* Set custom width and center it */}
          <Input 
            type="email"
            variant="underlined"
            label="Email"
            placeholder="Enter your email"
          />
          <Input 
            type="password"
            variant="underlined"
            label="Password"
            placeholder="Enter your password"
          />
          <Button 
            color="primary" 
            className="mt-4 w-full"
          >
            Signup
          </Button>
          <div className="flex justify-between mt-5"> {/* Flex container for links */}
            <Link 
              href="/" 
              className="text-current hover:text-blue-400 duration-300 font-nunito"
            >
              Return Home
            </Link>
            <Link 
              href="/login" // Adjust the href as needed
              className="text-current hover:text-blue-400 duration-300 font-nunito"
            >
              Already have an account?
            </Link>
          </div>
        </div> 
      </div>
    </div>  
  );
}
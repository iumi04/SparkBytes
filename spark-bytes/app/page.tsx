import Header from "./components/header";
import './globals.css';
import { Image } from "@nextui-org/react";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-8 bg-background text-foreground">
      <div className="flex w-full max-w-4xl">
        <div className="w-1/2">
          <Image
            className="dark:invert rounded-lg object-cover object-center"
            src="/spark_bytes.jpeg"
            alt="Spark Bytes logo"
            width="100%"
            height="auto"
          />
        </div>
        <div className="w-1/2 p-8 font-nunito">
          <h1 className="text-4xl font-bold mb-4 mt-35">spark! bytes</h1>
          <div className="p-0.5 rounded-lg bg-gradient-to-r from-white/10 to-gray-300">
            <div className="text-lg bg-white rounded-lg shadow-lg backdrop-blur-md p-4">
              Spark! Bytes is a revolutionary platform for Boston University’s community. After events, any leftover food can be posted here, and those interested can sign up to grab some delicious free food.
            </div>
          </div>
        </div>
      </div>
    </div>
      
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </>
  );
}

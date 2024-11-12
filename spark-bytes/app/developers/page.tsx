'use client';
import React, { useEffect, useState } from 'react';
import Header from "../components/header";
import Foot from '../components/Foot';

export default function Developers() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    fetch("http://localhost:5000/data") 
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <h1>About the Authors:</h1>
      
      {data && data.map((author, index) => (
        <div key={index} className="author-info">
          <img src="download.png" className="h-[48px] object-contain" alt="Author" />
          <p>
            My name is {author.first_name} {author.last_name} and I am currently a {author.college_year} student at Boston University. You can reach me at {author.email}.
          </p>
        </div>
      ))}

      <Foot />
    </div>
  );
}

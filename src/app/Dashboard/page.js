"use client";
// DashBoard Page
import './dashboardstyle.css';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      let response = await fetch("https://dummyjson.com/c/65d0-ac24-4e8b-83fe"); // Fetching data
      let data = await response.json(); // Parsing response
      setBlogData(data); // Setting data
      setLoading(false); // Loading done
    } catch (error) {
      console.log(error); // Log error
      setLoading(false); // Loading done
    }
  };

  useEffect(() => {
    fetchBlogData(); // Fetch on mount
  }, []);

  return (
    <div className={`parent p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white ${loading ? 'loading' : ''}`}>
        <p className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 underline decoration-purple-400 decoration-rounded-lg'>Blog</p>
        
      {blogData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       
          {blogData.map((blogItem) => (
            <Link href={`../Dashboard/View/${blogItem.id}`} key={blogItem.id}>
              <div className={`bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out blog-container ${!loading ? 'loaded' : ''}`}>
                <div className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-600">
                  {blogItem.title}
                </div>
                <div className='flex items-center justify-around text-gray-400 mb-4'>
                  <div className="">Published on: {blogItem.date_published}</div> {/* Date display */}
                  <div className="">Author: {blogItem.author}</div> {/* Author display */}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-200">
                    <Image src='/images/reading.png' width={20} height={20} alt="readings" className="mx-2" /> {/* Readings */}
                    <span className="ml-1">{blogItem.total_reads}</span> {/* Reads count */}
                  </div>
                  <div className="flex items-center text-gray-200">
                    <Image src='/images/love.png' width={20} height={20} alt="likes" className="mx-2" /> {/* Likes */}
                    <span className="ml-1">{blogItem.likes}</span> {/* Likes count */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[100vh] flex justify-center items-center text-gray-500 font-extrabold">
          <Image src='/images/loading.png' width={30} height={100} alt="loading" className="animate-pulse" /> {/* Loading animation */}
          <span className="ml-4">Loading...</span> {/* Loading text */}
        </div>
      )}
    </div>
  );
}

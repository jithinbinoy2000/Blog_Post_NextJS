"use client";
// View Page
import "./view.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function View({ params }) {
  // Extract the `id` from the URL parameters.
  const { id } = params;

  // State to hold the blog item data.
  const [blogItem, setBlogItem] = useState([]);

  useEffect(() => {
    // Fetch the blog item only if `id` is present.
    if (id) {
      const fetchBlogItem = async () => {
        try {
          // Fetch blog data from the provided API endpoint.
          let response = await fetch(
            `https://dummyjson.com/c/65d0-ac24-4e8b-83fe`
          );
          let data = await response.json();

          // Filter the fetched data to find the blog item matching the `id`.
          setBlogItem(data.filter((item) => item.id == id));
        } catch (error) {
          // Log any errors encountered during the fetch operation.
          console.error(error);
        }
      };
      fetchBlogItem();
    }
  }, [id]);

  // If the blog data is still loading, show a loading screen.
  if (!blogItem[0])
    return (
      <div className="h-[100vh] flex justify-center items-center bg-gray-900 text-white">
        <Image
          src="/images/loading.png"
          width={50}
          height={100}
          className="mx-2 animate-pulse"
        />
        <span className="text-xl font-medium">Loading...</span>
      </div>
    );

  // Render the blog item once the data is available.
  return (
    <div className="p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen text-white flex justify-center items-center">
      <div className="view-box-container w-full md:w-[400px] border border-gray-700 rounded-lg h-auto shadow-lg mx-auto p-6 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
        {/* Link back to the Dashboard */}
        <Link href={"/Dashboard"}>
          <Image
            src="/images/left-arrow.png"
            width={20}
            height={100}
            className="my-3 hover:w-[30px] duration-300"
          />
        </Link>

        {/* Blog Title with a gradient effect */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          {blogItem[0]?.title}
        </h1>

        {/* Published Date and Author Info */}
        <p className="text-sm text-gray-400 mb-2">
          Published on: {blogItem[0]?.date_published}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Author: {blogItem[0]?.author}
        </p>

        {/* Blog Content */}
        <p className="text-base leading-relaxed mb-4">{blogItem[0]?.content}</p>

        {/* Highlighted Quote from the Blog */}
        <blockquote className="text-lg italic font-semibold text-gray-200 border-l-4 border-purple-500 pl-4 mb-4">
          "{blogItem[0]?.quote}"
        </blockquote>

        {/* Blog Stats: Total Reads and Likes */}
        <div className="flex justify-between text-gray-400 text-sm mt-4">
          <p className="flex items-center mx-2 gap-2">
            <Image
              src="/images/reading.png"
              width={30}
              height={100}
              alt="readings"
              className="mx-2"
            />
            <span className="font-semibold text-white">
              {blogItem[0]?.total_reads}
            </span>
          </p>
          <p className="flex items-center mx-2 gap-2">
            <Image
              src="/images/love.png"
              width={30}
              height={100}
              alt="likes"
              className="mx-2"
            />
            <span className="font-semibold text-white">
              {blogItem[0]?.likes}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blogData, setBlogData] = useState([]);
  
  const fetchBlogData = async () => {
    try {
      let response = await fetch("https://dummyjson.com/c/65d0-ac24-4e8b-83fe");
      let data = await response.json();
    //   console.log(data);
      setBlogData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {blogData.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogData.map((blogItem) => (
           <Link href={`../Dashboard/View/${blogItem.id}`}>
            <div key={blogItem.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-xl font-semibold mb-2">{blogItem.title}</div>
              <div className="text-gray-600 mb-2">{blogItem.date_published}</div>
              <div className="flex  items-center justify-between">
              <div className="text-gray-800 flex items-center">
                <Image src='/images/reading.png' width={20} height={100} alt="readings"  className="mx-2"></Image>
                {blogItem.total_reads}</div>
              <div className="text-gray-800 flex items-center">
                <Image src='/images/love.png' width={20} height={100} alt="likes" className="mx-2"></Image>
                 {blogItem.likes}</div>
              </div>
           
            </div>
           </Link>
           
          ))}
        </div>
      ) : (
        <div className="h-[100vh] flex justify-center items-center text-gray-500 font-extrabold ">
            <Image src='/images/loading.png' width={30} height={100} alt="loading"></Image>
            Loading...</div>
      )}
    </div>
  );
}

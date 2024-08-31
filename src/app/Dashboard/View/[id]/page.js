"use client"
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function View({params}) {
//   const router = useRouter();
  const { id } =params
  console.log(id);
  
  const [blogItem, setBlogItem] = useState([]);

  useEffect(() => {
    if (id) { 
      const fetchBlogItem = async () => {
        try {
          let response = await fetch(`https://dummyjson.com/c/65d0-ac24-4e8b-83fe`);
          let data = await response.json();
          setBlogItem(data.filter((item)=>item.id==id));
        } catch (error) {
          console.error(error);
        }
      };

      fetchBlogItem();
    }
  }, [id]);
console.log(blogItem);


  if (!blogItem) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">{blogItem.title}</h1>
      <p>{blogItem.date_published}</p>
      <div>
        <p>Reads: {blogItem.total_reads}</p>
        <p>Likes: {blogItem.likes}</p>
      </div>
    </div>
  );
}

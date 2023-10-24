"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TCategory } from "../types";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";

const NewsForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [categories,setCategories]=useState<TCategory[]>([]);
  const [selectedCategory,setSelectedCategory]=useState("");
  const [imageUrl,setImageUrl]=useState("");
  const [publicId,setPublicId]=useState("");
  const [error,setError] = useState("");

  const router = useRouter();

  useEffect(()=>{
    const fetchAllCategories = async() => {
      const res = await fetch('/api/categories');
      const catNames = await res.json();
      setCategories(catNames)
    };
    fetchAllCategories();
  },[])
const handleImageUpload = (results: CldUploadWidgetResults) => {
  console.log("results:",results);
  const info = results.info as object;

  if('secure_url' in info && 'public_id' in info){
    const url = info.secure_url as string;
    const public_id = info.public_id as string
    setImageUrl(url)
    setPublicId(public_id);
    console.log("url:", url);
    console.log("public_id:" ,public_id)
  };
}
  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index:number) => {
    setLinks((prev)=> prev.filter((_,i) => i !== index));
  };
  const removeImage = async(e:React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await fetch('api/removeImage', {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({publicId})
      });
  
      if(res.ok){
        setImageUrl("")
        setPublicId("")
      }
    } catch (error) {
      console.log(error);
    }
   
  }
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!title || !content){
      setError("Title and content are required");
      return;
    }

    try {
      const res = await fetch("api/posts", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,

        })
      })

      if(res.ok){
        router.push("/dashboard")
      }
    } catch (error) {
      console.log()
    }
  }
  return (
    <div>
      <h1 className="py-2">CREATE POST</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Enter Title Here..." />
        <textarea onChange={e => setContent(e.target.value)} id="" placeholder="Content"></textarea>
        {links &&
          links.map((link, i) => (
            <div className="flex gap-2 items-center" key={i}>
              <span> <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg></span>
              {" "}
             
              <Link className="link" href={link}>{links}</Link>
              <span className="cursor-pointer" onClick={()=> deleteLink(i)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
                
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              </span>
             
            </div>
          ))}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Paste the link and click on Add "
          />
          <button onClick={addLink} className="btn flex items-center gap-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add
          </button>
        </div>
        <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} className={`${imageUrl && "pointer-events-none"} h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative`} onUpload={handleImageUpload}>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

          </div>
          {imageUrl && <Image src={imageUrl} alt={title} fill className="absolute object-cover inset-0"/>}
        </CldUploadButton>
        {publicId && <button onClick={removeImage} className="w-fit bg-red-600 font-bold text-white mb-4 py-2 px-4 rounded-md">Remove Image</button>}
        <select onChange={e => setSelectedCategory(e.target.value)} className="appearance-none py-2 px-2 border-2 rounded-md border-slate-300">
          <option>Select a category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}
              </option>
            ))}
        </select>
       
        <button type="submit" className="primary-btn">
          Create Post
        </button>
       {error && <div className="text-red-500 p-2 font-bold">{error}</div>} 
      </form>
    </div>
  );
};

export default NewsForm;

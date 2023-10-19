import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface postProps{
  id:number,
  author:string,
  title:string,
  content:string,
  thumbnail?:string,
  category?:string,
  date:string,
  links?:string
  
}
const Posts = ({id,author,title,content,thumbnail,category,date,links}:postProps) => {
  return (
    <div className='border-b my-4'>
      <h2>Posted by: <span className='font-bold'>{author}</span> on {date}</h2>
      <div className=' py-2'>{thumbnail ? <Image src={thumbnail} alt={""} width={400} height={30} className='object-cover rounded-md object-center'/> : <Image src={"/face3.jpg"} alt={""} width={400} height={30} className='rounded-md object-cover object-center'/>}</div>

     
      <Link href={`/categories/${category}`}> <p className='bg-black text-white w-fit py-1 mb-2 rounded-md px-4'>{category}</p></Link>
      <h1>{title}</h1>
      <p className='pb-2'>{content}</p>

      <div className='flex gap-4'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>

        <p className='text-purple-600 underline text-sm text-ellipsis overflow-hidden'>{links}</p>
      </div>
      
    </div>
  )
}

export default Posts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(req:Request){
  const{title, content,links, selectedCategory, imageUrl, publicId} = await req.json()
  const authorEmail = "mutumabrianm@gmail.com"

  if(!title || !content){
    return NextResponse.json({error:"Title and content are required."},{status:500})
  }
try {
  const newPost =  await prisma.post.create({data:{title,content,links,imageUrl,publicId,catName:selectedCategory,authorEmail}});
  console.log("Post Created")
  return NextResponse.json(newPost)
} catch (error) {
  return NextResponse.json({message:"Couldn't create post"})
}

}

export async function GET(){
  try {
    const post = await prisma.post.findMany({
      include:{author:{select:{name:true}}},
      orderBy:{
        createdAt:"desc"
      }});
      return NextResponse.json(post);
  } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Some error occurred"},{status:500})
  }
 
}
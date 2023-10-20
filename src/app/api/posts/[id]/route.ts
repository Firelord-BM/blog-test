import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const post = await prisma.post.findUnique({where:{id}})
        console.log("id:", id);
        return NextResponse.json(post);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Could not fetch post"})
    }
 
}

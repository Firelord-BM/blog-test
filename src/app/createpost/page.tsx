import React from 'react'
import NewsForm from '../components/NewsForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function CreatePost(){

  const session = await getServerSession(authOptions)
  console.log(session)

  if(!session){
    redirect("/sign-in")
  }
  return (
    <div>
        <NewsForm/>
    </div>
  )
}


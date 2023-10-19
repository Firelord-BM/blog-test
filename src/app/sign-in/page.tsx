import React from 'react'
import SignInBtn from '../components/SignInBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Signin(){
  const session = await getServerSession(authOptions)

  if(session){
    redirect("/dashboard")
  }
  return <SignInBtn/>
}
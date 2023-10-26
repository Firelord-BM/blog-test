import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { NextAuthProvider } from './components/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TECH BLOG',
  description: 'Tech news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <div className={`lg:px-16 py-8 lg:max-w-[900px] shadow-xl p-8 flex flex-col mx-auto min-h-screen`}>
        <div>
        <Nav/> 
        <div className='flex-auto'>{children}</div>
        
        <Footer/>
        </div>
         </div>
        </NextAuthProvider>
        <Toaster/>
     
      </body>
      
     
    </html>
  )
}

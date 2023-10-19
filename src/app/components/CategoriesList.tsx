import React from 'react'
import {CategoriesData} from "@/app/data"
import Link from 'next/link'

export default function CategoriesList() {
  return (
    <div className='flex gap-2 text-sm text-wrap'>
       {CategoriesData && CategoriesData.map((category:any)=>(<Link className="bg-black text-white px-2 py-1 rounded-md" key={category.id} href={`/category/${category.name}`}>{category.name}</Link>)
       )}
    </div>
  )
}

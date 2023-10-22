import React from 'react'
import Link from 'next/link'
import { TCategory } from '../types'

const getCategories = async(): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if(res.ok){
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error)
    
  }
  return null;
}
export default async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className='flex gap-2 text-sm text-wrap'>
       {categories && categories.map((category:TCategory)=>(<Link className="bg-black text-white px-2 py-1 rounded-md" key={category.id} href={`/category/${category.catName}`}>{category.catName}</Link>)
       )}
    </div>
  )
}

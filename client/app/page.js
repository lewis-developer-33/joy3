'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const router = useRouter()

  return (
    <div>
      <header className='font-bold text-xl px-10 py-4 bg-yellow-800 text-white'>
        <div>RBS</div>
      </header>
      <section className='h-[90vh] bg-slate-200 grid grid-cols-2 px-4 pt-20'>
        <div className='space-y-6'>
          <h2 className='font-bold text-6xl'>Free <span className='text-orange-600'>Scolarships</span> for Every Bright Student</h2>
          <p className='font-semibold text-lg w-[400px]'>Get guaranteed and fully paid scholarships for each and every bright student that needs it</p>
          <div className='grid gap-2 w-[300px]'>
            <Link className='bg-orange-600 text-white px-4 py-2 rounded-md font-semibold mt-10' href='/apply'>Apply Now</Link>
            <Button  onClick={() => router.push('auth/sign-up')}>Admin Log in</Button>
          </div>
        </div>
        <div>
          <Image
          src='/scholarship.jpg'
          alt='scholarship'
          width={600}
          height={800}
          />
        </div>
      </section>
    </div>
  )
}

export default page
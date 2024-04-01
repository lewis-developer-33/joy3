'use client'
import React from 'react'

const adminLayout = ({children}) => {
    const username = localStorage.getItem('name')
    const user = username != null ? username[1] : 'J'
  return (
    <>
        <header className='flex items-center justify-between shadow-md px-10 py-4 font-semibold'>
            <div>RBS-admin</div>
            <div className='flex items-center justify-center p-2 h-10 w-10 bg-orange-600 text-white font-semibold'>{user}</div>
        </header>
        <section>
            {children}
        </section>
    </>
  )
}

export default adminLayout
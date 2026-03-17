import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-amber-300'>
        <ul className='flex justify-between items-center gap-5 mx-auto bg-gray-200 py-10 px-10'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/testimonials'>Testimonials</Link>
            <Link to='/countries'>Countries</Link>
            <div className='flex flex-col gap-0.5'>
              <div className='w-4 h-0.5 bg-black'></div>
              <div className='w-4 h-0.5 bg-black'></div>
              <div className='w-4 h-0.5 bg-black'></div>
            </div>
        </ul>
    </nav>
  )
}

export default Navbar
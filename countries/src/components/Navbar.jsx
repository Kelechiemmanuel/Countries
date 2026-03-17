import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-amber-300'>
        <ul className='flex justify-between w-[50%] items-center mx-auto bg-amber-950 py-10 px-10'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/testimonials'>Testimonials</Link>
            <Link to='/testimonials'>Testimonials</Link>
            <Link to='/countries'>Countries</Link>
        </ul>
    </nav>
  )
}

export default Navbar
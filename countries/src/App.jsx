import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Navbar from './components/Navbar'
import Countries from './components/Countries'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/testimonials' element={<Testimonials />}/>
        <Route path='/countries' element={<Countries />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
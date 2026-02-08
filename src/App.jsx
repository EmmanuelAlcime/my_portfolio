import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '@/styles/project.css'
import '@/styles/portfolio_pages.css'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

function App() {
  
  return (
    <>
       <Navbar />
       <Outlet />
       <Footer/>
    </>
  )
}

export default App

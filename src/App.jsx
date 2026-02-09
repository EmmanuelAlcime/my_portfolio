import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '@/styles/project.css'
import '@/styles/portfolio_pages.css'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
       <Navbar />
       <Outlet />
       <Footer/>
    </>
  )
}

export default App

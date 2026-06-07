import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import '@/styles/project.css'
import '@/styles/portfolio_pages.css'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import SEO from '@/components/SEO'

function App() {
  const location = useLocation()
  const outletRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const el = outletRef.current
    if (el) {
      el.classList.remove('page-enter')
      void el.offsetWidth
      el.classList.add('page-enter')
    }
  }, [location.pathname])

  return (
    <>
       <SEO />
       <ScrollProgress />
       <BackToTop />
       <Navbar />
       <div ref={outletRef} className="page-transition-wrapper">
         <Outlet />
       </div>
       <Footer/>
    </>
  )
}

export default App

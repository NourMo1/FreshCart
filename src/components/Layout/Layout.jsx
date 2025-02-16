import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
      <div className='min-h-screen flex flex-col justify-between'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
  )
}

export default Layout
import React from 'react'
import HomeNavbar from '../Components/Navbar/HomeNavbar'
import { Outlet } from 'react-router-dom'




const HomeLayout = () => {
  return (
    <>
    <nav>
   <HomeNavbar/>
    </nav>
    <Outlet/>
       
    </>
  )
}

export default HomeLayout
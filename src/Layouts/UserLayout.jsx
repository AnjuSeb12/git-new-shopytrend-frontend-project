import React from 'react'
import UserNavbar from '../Components/Navbar/HomeNavbar.jsx'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
    <nav>
    <UserNavbar/>
    </nav>
    <Outlet/>
       
    </>
          
  )
}

export default UserLayout
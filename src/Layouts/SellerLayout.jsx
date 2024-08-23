import React from 'react'
import SellerNavbar from '../Components/Navbar/SellerNavbar'
import { Outlet } from 'react-router-dom'


const SellerLayout = () => {
  return (
    <div>
      <nav>
      <SellerNavbar/>
      </nav>
      <Outlet/>
       
    </div>
  )
}

export default SellerLayout
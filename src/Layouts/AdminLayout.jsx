import React from 'react'
import AdminNavbar from '../Components/Navbar/AdminNavbar'
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <div>
      <nav>
      <AdminNavbar/>
      </nav>
      <Outlet/>
       
    </div>
  )
}

export default AdminLayout
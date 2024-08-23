import React from 'react'
import UserSignIn from '../../Components/User/UserSignIn.jsx'


const UserSignInPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-5">
    <h1 className="cursor-pointer rounded-lg px-4 py-1 text-2xl text-green-700 shadow-lg transition-all duration-300 ease-in  hover:scale-110">
      User Signin page
    </h1>
      <UserSignIn/>
  </div>
  )
}

export default UserSignInPage
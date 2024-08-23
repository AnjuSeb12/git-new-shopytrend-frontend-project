import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UsersView = () => {
    const [users, setUsers] = useState([])
    console.log(users)

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/user/users", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                setUsers(res.data.users)
            } catch (error) {
                console.log(error);
            }
        };
        getAllUsers()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users && users.map((user, index) => (
                    <div
                        key={index}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white"
                    >
                        <h2 className="text-lg font-semibold text-gray-800">#{index + 1}</h2>
                        <p className="text-sm text-gray-600"><strong>First Name:</strong> {user.firstName}</p>
                        <p className="text-sm text-gray-600"><strong>Last Name:</strong> {user.lastName}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersView;

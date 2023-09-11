import React from 'react'
import { FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <div
            className='flex justify-between items-center w-full p-4'>
            <div
                className='text-3xl font-bold'>Expense Tracker</div>
            <div
                className='flex gap-4'>
                <a
                    href="/add"
                    className='iconButton flex items-center gap-4 text-xl bg-green-500 border-2 shadow-lg shadow-cyan-500/50 transition-all ease-in-out duration-300 hover:bg-blue-400'><FaPlus size={30} />Add Expense</a>
                <a href="/profile" className='iconButton'><FaUserAlt size={30} /></a>
                <button className='iconButton' onClick={logout}><FaSignOutAlt size={30} /></button>
            </div>
        </div>
    )
}

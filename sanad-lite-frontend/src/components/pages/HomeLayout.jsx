import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'



const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
        </>
    )
}

export default HomeLayout
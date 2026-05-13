import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/header'
import Footer from '../components/footer'
import { useAppDispatch } from '../store/app_hook'
import { getMe } from '../store/features/auth/auth_slice'

const MainLayout:React.FC = () => {
  const dispatch=useAppDispatch()
  useEffect(()=>{
    dispatch(getMe())
  },[])
  return (
    <div>
      <Navbar />
    <main className='pt-4'>
      <Outlet/>
    </main>
    <Footer />
      
    </div>
  )
}

export default MainLayout

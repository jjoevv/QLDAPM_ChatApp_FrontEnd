import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Stack } from 'react-bootstrap'
import Chat from './../pages/chat/Chat'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAppContext } from '../context/authContext'
import { loginSuccess } from '../actions/actions'
import useAuth from '../hooks/useAuth'

const MainLayout = () => {
  const { isLoggedIn } = useAuth();
  if(!isLoggedIn){
    return <Navigate to='/login'/>
  }
  return (
      <div
        className='h-100 mh-100 m-0 p-0 overflow-y-hidden d-flex'>
        <Sidebar />
        <Header/>
        <Chat/>
      </div>
  )
}

export default MainLayout
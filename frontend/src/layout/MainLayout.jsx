import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Stack } from 'react-bootstrap'
import Chat from './../pages/chat/Chat'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAppContext } from '../context/authContext'
import { loginSuccess } from '../actions/actions'

const MainLayout = () => {
  const {state, dispatch} = useAppContext()

  const naviagte = useNavigate()
  const {getFromLocalStorage, refreshLogin} = useLocalStorage()
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("accessToken");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      refreshLogin(foundUser)
    }
   else{
    naviagte('/login')
   }
  },[])
  return (
    <>
      <Stack
        className='h-100 mh-100 m-0 p-0 overflow-y-hidden'
        direction='horizontal'>
        <Sidebar />
        <Header/>
        <Chat/>
      </Stack>
    </>
  )
}

export default MainLayout
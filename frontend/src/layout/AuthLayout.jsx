import React from 'react'
import { useAuth } from '../context/AuthContext'

const AuthLayout = () => {
    const {isLogin} = useAuth()

    if(isLogin){
        
    }
  return (
    <div>AuthLayout</div>
  )
}

export default AuthLayout
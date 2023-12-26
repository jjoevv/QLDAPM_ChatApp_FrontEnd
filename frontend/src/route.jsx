import { Route, Routes, Navigate,  } from "react-router-dom";
import React, {useEffect} from 'react'

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import MainLayout from "./layout/MainLayout";
import AllRooms from "./components/List/AllRooms";
import AllFriends from "./components/List/AllFriends";
import Setting from "./components/List/Setting";
import TaoTest from "./test";

const authPage = [
  { path: 'messages', element: <AllRooms /> },
  { path: 'friends', element: <AllFriends /> },
  { path: 'setting', element: <Setting /> },
]

const MyRoute = () => {
  return (
    
    <Routes>
      
      <Route path="" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      <Route element={<MainLayout />}>
        
        {
          authPage.map(page =>
            <Route
              key={page.path}
              path={page.path}
              element={page.element}
            />)
        }
      </Route>
    </Routes>
  )
}

export default MyRoute
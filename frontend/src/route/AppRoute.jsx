// AppRoute.js
import React from 'react';
import { Router, Route, Link, Routes, Navigate } from 'react-router-dom';



import AllRooms from '../components/List/AllRooms';
import AllFriend from '../components/List/AllFriends';
import Setting from '../components/List/Setting';
import Login from '../pages/auth/Login';
import useAuth from '../hooks/useAuth';
import MainLayout from '../layout/MainLayout'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if(!isLoggedIn){
    return <Navigate to='/login'/>
  }
  else {
    return <MainLayout>{children}</MainLayout>
  }
};

const routes = [
  { path: "/messages", element: <AllRooms /> },
  { path: "/friends", element: <AllFriend /> },
  { path: "/settings", element: <Setting /> },
]

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {
          routes.map((route) =>
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />)
        }
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoute;

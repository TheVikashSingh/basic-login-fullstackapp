import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />, 
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/reset-password",
    element: <ResetPassword />
  }
]);
function App() {

  return (
    <>
      <div>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App

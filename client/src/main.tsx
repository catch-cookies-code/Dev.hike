import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Layout Imports
import RootLayout from './layouts/root-layout'

// View Imports
import SignInComponent from './views/SignIn'
import SignUpComponent from './views/SignUp'
import Dashboard from './views/Dashboard'
import DashboardLayout from './layouts/dashboard-layout.tsx'
import Landing from './views/Landing.tsx'
import NewTimeLine from './views/NewTimeLine.tsx'
import NewEvent from './views/NewEvent.tsx'
import NewPost from './views/NewPost.tsx'
import Profile from './views/Profile.tsx'
import InitiateProfileSecond from './views/InitiateProfileSecond.tsx'
import InitiateProfileFirst from './views/InitiateProfileFirst.tsx'
import User from './views/User.tsx'
import ProtectRoute from './layouts/protect-route.tsx'
import axios from 'axios'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/sign-in', element: <SignInComponent /> },
      { path: '/sign-up', element: <SignUpComponent /> },
      { 
        element: <ProtectRoute />,
        children: [
          { path: '/profile', element: <Profile /> },     
          { path: '/new/timeline', element: <NewTimeLine /> },
          { path: '/new/event', element: <NewEvent /> },
          { path: '/new/post', element: <NewPost /> },
          { path: '/initiate-profile/1', element: <InitiateProfileFirst /> },
          { path: '/initiate-profile/2', element: <InitiateProfileSecond /> },
          { path: '/user/:userId', element: <User /> },
          {
            element: <DashboardLayout />,
            children: [
              {
                path: '/dashboard',
                element: <Dashboard />
              }
            ]
          }
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)

export const API_URL = import.meta.env.VITE_API_URL || ""
axios.defaults.withCredentials = true

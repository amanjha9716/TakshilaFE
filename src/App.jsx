import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './landing/Navbar'
import About from './landing/About'
import Services from './landing/Services'
import Contact from './landing/Contact'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './landing/Signup'
import Landing from './landing/Landing'
import UserRegistrationForm from './landing/Register'
import UserLoginForm from './landing/login'
import SLanding from './components/StudentUI/SLayout'
import Dashboard, { dashboardloader } from './components/StudentUI/Pages/Dashboard/Dashboard'
import { dataLoader } from './components/StudentUI/SLayout'
import Assesment, { assesLoader } from './components/StudentUI/Pages/Assesment/Assesment'
import Attendance from './components/StudentUI/Pages/Attendance'
import Notice, { noticeloader } from './components/StudentUI/Pages/Notice/Notice'
import Learningpath, { resourceloader } from './components/StudentUI/Pages/LearningPath/learningpath'
import Resultpage, { resultloader } from './components/StudentUI/Pages/Result/Resultpage'
import Errorelement from './components/StudentUI/Pages/Errorelement/Errorelement'
const router=createBrowserRouter([
  {path:'/',element:<Landing/>,errorElement:<Errorelement/>},
  {path:'/signup',element:<UserRegistrationForm/>},
  {path:'/login',element:<UserLoginForm/>},
  {path:'/student',element:<SLanding/>,
  id:'student'
  ,loader:dataLoader,
  
    children:[
      {path:'',element:<Dashboard/>,loader:dashboardloader},
      {
        path:'assesment',element:<Assesment/>,id:'asses',loader:assesLoader
      },
       { path:'attendance',element:<Attendance/>},
       {path:'result',element:<Resultpage/>,loader:resultloader},
       {path:'notice',element:<Notice/>,loader:noticeloader},
       {path:'learning',element:<Learningpath/>,loader:resourceloader}

    ]
    
  }
])
function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App

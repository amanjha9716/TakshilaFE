
import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Landing from './landing/Landing'
import UserRegistrationForm from './landing/Register'
import UserLoginForm from './landing/login'
import SLanding from './components/StudentUI/SLayout'
import Dashboard from './components/StudentUI/Pages/Dashboard/Dashboard'
import Assesment from './components/StudentUI/Pages/Assesment/Assesment'
import Attendance from './components/StudentUI/Pages/Attendance'
import Notice, { noticeloader } from './components/StudentUI/Pages/Notice/Notice'
import Learningpath from './components/StudentUI/Pages/LearningPath/learningpath'
import Resultpage from './components/StudentUI/Pages/Result/Resultpage'
import Errorelement from './components/StudentUI/Pages/Errorelement/Errorelement'
import Test from './components/Test/Test'
const router=createBrowserRouter([
  {path:'/',element:<Landing/>,errorElement:<Errorelement/>},
  {path:'/signup',element:<UserRegistrationForm/>},
  {path:'/login',element:<UserLoginForm/>},
  {path:'/student',element:<SLanding/>,
  id:'student',
  
    children:[
      {path:'',element:<Dashboard/>},
      {
        path:'assesment',element:<Assesment/>,
      },
       { path:'attendance',element:<Attendance/>},
       {path:'result',element:<Resultpage/>},
       {path:'notice',element:<Notice/>,loader:noticeloader},
       {path:'learning',element:<Learningpath/>},
    ]
    
  },
  {path:'test/:testid',element:<Test/>}

])
function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App

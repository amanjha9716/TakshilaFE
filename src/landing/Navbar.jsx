import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
        <h1>Takshila</h1>
        
        <ul>
            <li><i class="fa-solid fa-house-user"></i> Home</li>
            <li><i class="fa-solid fa-circle-info"></i>About</li>
            <li><i class="fa-solid fa-briefcase"></i>Services</li>
            <li><i class="fa-solid fa-phone"></i>Contact</li>
           <Link to={'/signup'}><button>
            Sign Up
        </button></Link>
        <Link to={'/login'}><button>
            Log In
        </button></Link> 
        </ul>
    
        
        
    </div>
  )
}

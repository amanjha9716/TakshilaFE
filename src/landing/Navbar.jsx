import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Make sure to include your CSS file

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='navbar'>
      <h1>Takshila</h1>
      <div className='burger' onClick={toggleMenu}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><i className="fa-solid fa-house-user"></i> Home</li>
        <li><i className="fa-solid fa-circle-info"></i> About</li>
        <li><i className="fa-solid fa-briefcase"></i> Services</li>
        <li><i className="fa-solid fa-phone"></i> Contact</li>
        <Link to={'/signup'}>
          <button className='userbtn'>Sign Up</button>
        </Link>
        <Link to={'/login'}>
          <button className='userbtn'>Log In</button>
        </Link>
      </ul>
    </div>
  );
}

import { Link, NavLink, Outlet, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import './slanding.css';
import React, { useState } from 'react';
import { DataProvider } from '../store';

function handledisable(e) {
  e.preventDefault();
  alert("Abhishek: sorry the link has been disabled for now. I am working on this page.");
}

export default function SLanding() {
  const navigate = useNavigate();
  const navigation = useNavigation(); // Detect route changes

  function handlelogout() {
    localStorage.removeItem('userData');
    navigate('/login');
  }

  const itemStr = localStorage.getItem("userData");
  const item = JSON.parse(itemStr);
  const user=JSON.parse(item.value);

  const [data, setData] = useState([]);

  // This condition checks if the route is currently changing
  const isLoading = navigation.state === 'loading';

  return (
    <DataProvider>
      <div className='studcont'>
        {/* Loader overlay */}
        {isLoading && (
          <div className="loader-overlay">
            <div className="spinner"></div> {/* This can be a CSS spinner */}
          </div>
        )}
        
        <div className="first">
          <div className="head">
            <div className="info">
              <i style={{ color: '#ec763e', fontSize: "1.2rem" }} className="fa-solid fa-school"></i>
              <span style={{ color: "white", fontSize: '1.2rem', fontWeight: '400', fontFamily: "poppins", alignItems: "center" }}>Takshila</span>
            </div>
            <br />
            {user && (
              <div className="profile">
                <img src="https://cdn.dribbble.com/users/8309782/screenshots/17981401/media/5772ee39311b670f8ffe00052b4e48e3.jpg" alt="Profile" />
                <span>{user.studname}</span>
                <span style={{ color: 'grey', fontSize: '12px' }}>@{user.username}</span>
              </div>
            )}
          </div>
          <br />
          <div className="menu">
            <span style={{ color: '#fffffff3', fontSize: '13px', fontWeight: '500' }}>STUDENT MENU</span>
            <ul>
              <li>
                <NavLink to='' className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-chess-queen"></i> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="assesment" className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-microscope"></i> Assessments
                </NavLink>
              </li>
              <li>
                <NavLink to="result" className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-square-poll-vertical"></i> Result
                </NavLink>
              </li>
              <li>
                <NavLink to="attendance" className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-clipboard-user"></i> Attendance
                </NavLink>
              </li>
              <li>
                <NavLink to="notice" className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-circle-info"></i> Notice
                </NavLink>
              </li>
              <li>
                <NavLink to="learning" className={({ isActive }) => isActive ? 'active' : ''} end>
                  <i className="fa-solid fa-graduation-cap"></i> Learning Path
                </NavLink>
              </li>
            </ul>
          </div>
          <button onClick={handlelogout} style={{ margin: '40px 30px', width: '70%', padding: '7px', borderRadius: '15px', fontSize: '16px', fontWeight: '500', color: 'white', backgroundColor: '#f3763e', border: '0' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
        <Outlet />
      </div>
    </DataProvider>
  );
}


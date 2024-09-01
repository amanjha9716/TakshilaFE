import { Link, NavLink, Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import './slanding.css';
import React, { useEffect, useState } from 'react';
import { DataContext, DataProvider } from '../store';
function handledisable(e) {
  e.preventDefault();
  alert("Abhishek: sorry the link has been disabled for now. I am working on this page.");
}

export default function SLanding() {
  const navigate=useNavigate();

  function handlelogout()
  {
    localStorage.removeItem('userData');
    navigate('/login');
  }
  const user = useLoaderData();
    const [data,setData]=useState([]);
  return (
    <DataProvider>
    <div className='studcont'>
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
              <i className="fa-solid fa-chess-queen"></i>
              <NavLink to='' className={({ isActive }) => isActive ? 'active' : ''} end>Dashboard</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-microscope"></i>
              <NavLink to="assesment" className={({ isActive }) => isActive ? 'active' : ''} end>Assements</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-square-poll-vertical"></i>
              <NavLink to="result"  className={({ isActive }) => isActive ? 'active' : ''} end>Result</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-clipboard-user"></i>
              <NavLink to="attendance" className={({ isActive }) => isActive ? 'active' : ''} end>Attendance</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-circle-info"></i>
              <NavLink to="notice" className={({ isActive }) => isActive ? 'active' : ''} end>Notice</NavLink>
            </li>
            <li>
              <i className="fa-solid fa-graduation-cap"></i>
              <NavLink to="learning" className={({ isActive }) => isActive ? 'active' : ''} end>Learning Path</NavLink>
            </li>
          </ul>
        </div>
        <button onClick={handlelogout}style={{ margin: '40px 30px', width: '70%', padding: '7px', borderRadius: '15px', fontSize: '16px', fontWeight: '500', color: 'white', backgroundColor: '#f3763e', border: '0' }}>
          <i className="fa-solid fa-right-from-bracket"></i>Logout
        </button>
      </div>
      <Outlet />
    </div> 
    </DataProvider>

  );
}
export function dataLoader()
{
    const itemStr = localStorage.getItem("userData");
    const item = JSON.parse(itemStr);
    return JSON.parse(item.value);
}

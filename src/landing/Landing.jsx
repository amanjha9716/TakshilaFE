import React from 'react'
import '../App.css'
import About from './About'
import Services from './Services'
import Contact from './Contact'
import Navbar from './Navbar'
export default function Landing() {
  return (
    <>
     <div className='landing'>
       <Navbar/>
        <div className='landingdiv'>
          <span className='maintext'>
            Transform Your Future
            <br/>
            with the best faculty
            <br />
            <button>Start Your Journey</button>
          </span>

        </div>
      </div>
      <About/>
      <Services/>
      <Contact/>
    </>
  )
}

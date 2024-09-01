import React, { useRef, useState } from 'react'
import './contact.css'
export default function Contact() {
    const fnameref=useRef();
    const lnameref=useRef();
    const emailref=useRef();
    const messageref=useRef();
    const phoneref=useRef();
 
    function handlerequest()
    {
        
    }
function handlesubmit(e)
{
    e.preventDefault();
    const fname=fnameref.current.value;
    const email=emailref.current.value;
    const lname=lnameref.current.value;
    const phone=phoneref.current.value;
    const message=messageref.current.value;
    console.log(
        {
            fname,
            lname,
            email,

            message,
        phone
        })
   handlerequest();
    

}

  return (
    <section class="contact" id="contact">
      <div class="contact-container">
       
        <div class="information">
          <h3 class="heading">OUR INFORMATIONS</h3>
          <ul class="contacts">
            <li>
              <i class="fa-solid fa-location-dot"></i> WZ-497 srinagar delhi-110034 </li>
            <li>
              <i class="fa-solid fa-envelope"></i> jhaa2600@gmail.com </li>
            <li>
              <i class="fa-solid fa-phone"></i> 7838226306 </li>
            <li>
              <i class="fa-solid fa-print"></i> xxx-xxx-xxxx </li>
          </ul>
           
          <div class="logo">
            <a target="_blank" href="https://www.instagram.com/abhijha_007/"><i class="fa-brands fa-instagram"
                ></i></a>
            <a target="_blank" href="https://t.me/Abhishekjha007"><i class="fa-brands fa-telegram" aria-hidden="true"></i></a>
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100013448320463"><i class="fa-brands fa-facebook"
                aria-hidden="true"></i></a>
            <a target="_blank" href="https://twitter.com/imaabhishekjha"><i class="fa-brands fa-twitter"
                aria-hidden="true"></i></a>
            <a target="_blank" href="https://wa.me/7838226306?text=Hi Abhishek jha"><i class="fa-brands fa-whatsapp"
                aria-hidden="true"></i></a>
            <a target="_blank" href="https://www.linkedin.com/in/abhishek-jha-1990a61a0/"><i class="fa-brands fa-linkedin"
                aria-hidden="true"></i></a>
          </div>
        </div>
        <div class="form">
          <h1>Send a message</h1>
          <form action='' method="POST" onSubmit={handlesubmit}>
            <div class="inputs">
              <label for="fname">First Name</label>
              <input type="text"   className='input'id="fname" ref={fnameref}name="firstname" placeholder="Abhishek"required ></input>
            </div>
            <div class="inputs">
              <label for="lname">Last Name</label>
              <input type="text" className='input' id="lname" ref={lnameref} name="lastname" placeholder="jha"required/>
            </div>
            <div class="inputs">
              <label for="email">Email Address</label>
              <input type="email" className='input' id="email" ref={emailref}name="email" placeholder="example.gmail.com"required/>
            </div>
            <div class="inputs">
              <label for="phone">Phone number</label>
              <input type="text" className='input' id="phone" name="phone" ref={phoneref}placeholder="999999999" required/>
            </div>
            <div class="inputs">
              <label for="message">Message:</label>
              <textarea id="message" name="message" placeholder="your message"ref={messageref}required></textarea>
            </div>
            <button class="contactbut"type="submit" >
                Send Message
            </button>
          </form>
        </div>
      </div>
    </section>  

  )
}

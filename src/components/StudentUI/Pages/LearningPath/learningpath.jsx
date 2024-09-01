import React, { useState } from 'react';
import './learning.css';
import img from '/baby.gif'; // Ensure this path is correct
import { GoogleGenerativeAI } from "@google/generative-ai";
import ResourceCard from './ResourceCard';
import { useLoaderData } from 'react-router-dom';
// Fetch your API_KEY
const API_KEY = import.meta.env.VITE_API_KEY;

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
export default function Learningpath() {
  const {user:username,resourceURL}=useLoaderData();
  console.log(resourceURL);
  const [answer, setAnswer] = useState(<img src={img} alt="" style={{marginTop:"90%"}} />);
  const [inputValue, setInputValue] = useState("");

// console.log(username);
var interval;
  async function handleSubmit() {
    clearInterval(interval);
    setAnswer("Finding the best solution");

   let context=await fetch(`https://www.takshilabackend.somee.com/api/Results/getAlldata?username=${username.username}`);
context=await context.json();
context=JSON.stringify(context);
 
    const prompt = `${JSON.stringify(username)},${context} this is the backend data  and use this to answer this for student ${inputValue} in 300 words only and please make it personalize and dont return bold data `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
      // Call your chat function with some dynamic content if needed
      chat(text);
  }
  

  function chat(text) {
    let index = 0;
    setAnswer(text[0]);
     interval = setInterval(() => {
      // console.log(answer);
      setAnswer((prevAnswer) => prevAnswer + text[index]);
      

      index++;
      if (index >= text.length-1) {
        clearInterval(interval);
      }
    }, 10); // Adjust the speed as needed
  }

  return (
    <div className='learn'>
      <div className="helpdesk">
        <h1>Takshu Ai</h1>
        <div className="inputgrp">
          <input
            type="text"
            placeholder="Ask your query? and wait till he feed🥰"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Ask</button>
        </div>
        <div className="answersection">
          
          <div className="text">{answer}</div>
        </div>
      </div>
      <div className="resource">
        <h1>Resource</h1>
        <div className="inputgrp">
          <input
            type="text"
            placeholder="Search your Notes"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        <div className="pdf">
          <ResourceCard resname={"only this one is working fow now"} date={"2024-08-28"} totalstud={128} link={resourceURL}/>
          <ResourceCard resname={"chemistry ch-1"} date={"2024-08-28"} totalstud={128} link={"HTTP"}/>
          <ResourceCard resname={"chemistry ch-1"} date={"2024-08-28"} totalstud={128} link={"HTTP"}/>
        </div>
        <div className="comasses">
          <p>Video Resources</p>

          <table class="completed-quizzes">
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
             <tr>
                <td>Maths videoes</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
                
              </tr>
              <tr>
                <td>Maths videoes</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
                
              </tr><tr>
                <td>Maths videoes</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
                
              </tr>
              <tr>
                <td>Maths videoes</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
                
              </tr>
              
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}export async function resourceloader() {
  try {
    // Retrieve and parse user data from localStorage
    const itemStr = localStorage.getItem("userData");
    const item = JSON.parse(itemStr);
    const user = JSON.parse(item.value);

    // Fetch the PDF from the API
    const response = await fetch('https://www.takshilabackend.somee.com/api/Learning/downloadpdf?standard=4', {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      }
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Convert response to a Blob
    const blob = await response.blob();
    
    // Create a URL for the Blob
    const resourceURL = URL.createObjectURL(blob);

    // Return user and resource URL
    return { user, resourceURL };
  } catch (error) {
    console.error('Error loading resources:', error);
    throw error; // Re-throw the error to handle it where the function is called
  }
}

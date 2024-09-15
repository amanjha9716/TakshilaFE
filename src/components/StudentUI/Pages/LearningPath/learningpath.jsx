import React, { useState,Suspense } from 'react';
import './learning.css';
import img from '/baby.gif'; // Ensure this path is correct
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Tanstack Query for data fetching
import { fetchData } from '../../../util/http';
import Loader from '../Loader';
const ResourceCard=React.lazy(()=>import('./ResourceCard'));
// Fetch your API_KEY
const API_KEY = import.meta.env.VITE_API_KEY;

// Access your API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
async function fetchResourse(stand){
  const response = await fetch('https://www.takshilabackend.somee.com/api/Learning/downloadpdf?standard=4', {
    method: 'GET',
    headers: { 'Accept': '*/*' }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const blob = await response.blob();
  const resourceURL = URL.createObjectURL(blob);

  return  resourceURL ;
}
export default function LearningPath() {
  const itemStr = localStorage.getItem("userData");
    const item = JSON.parse(itemStr);
    const user = JSON.parse(item.value);
  
  const [answer, setAnswer] = useState(<img src={img} alt="" style={{ marginTop: "90%" }} />);
  const [inputValue, setInputValue] = useState("");
  //fetching the resources
  const {data:resourceURL,isLoading:resorisloading,isError:resoriserror,error:resorerr}=useQuery({
    queryKey:['resourse',user.stand],
    queryFn:()=>fetchResourse(user.stand),
    staleTime:5000
  })
  // Fetch results data using Tanstack Query 
  const { data: context, isLoading, isError, error } = useQuery({
    queryKey: ['results', user.username],
    queryFn: () => fetchData(`https://www.takshilabackend.somee.com/api/Results/getAlldata?username=${user.username}`),
    staleTime:5000
  });

  // Handle loading and error states


  async function handleSubmit() {
    setAnswer("Finding the best solution...");
    
    const contextString = JSON.stringify(context);
    const prompt = `${JSON.stringify(user)},${contextString} this is the backend data  and use this to answer this for student ${inputValue} in 300 words only and please make it personalize and dont return bold data`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    chat(text);
  }

  function chat(text) {
    let index = 0;
    setAnswer(text[0]);
    const interval = setInterval(() => {
      setAnswer((prevAnswer) => prevAnswer + text[index]);
      index++;
      if (index >= text.length - 1) {
        clearInterval(interval);
      }
    }, 10); // Adjust the speed as needed
  }

  return (
    isLoading?(
      
      <Loader/>
    ):

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
          <Suspense fallback={<Loader/>}>
          <ResourceCard resname={"only this one is working for now"} date={"2024-08-28"} totalstud={128} link={resourceURL} />

          </Suspense>
          <Suspense fallback={<Loader/>}>
          <ResourceCard resname={"only this one is working for now"} date={"2024-08-28"} totalstud={128} link={resourceURL} />

          </Suspense><Suspense fallback={<Loader/>}>
          <ResourceCard resname={"only this one is working for now"} date={"2024-08-28"} totalstud={128} link={resourceURL} />

          </Suspense>
                </div>
        <div className="comasses">
          <p>Video Resources</p>
          <table className="completed-quizzes">
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
                <td>Maths videos</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
              </tr>
              <tr>
                <td>Maths videos</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
              </tr>
              <tr>
                <td>Maths videos</td>
                <td>2024-08-30</td>
                <td>Maths</td>
                <td><a href="">Go to resource</a></td>
              </tr>
              <tr>
                <td>Maths videos</td>
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
}

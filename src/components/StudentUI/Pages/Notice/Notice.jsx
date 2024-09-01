import React, { useRef, useState } from 'react'
import './Notice.css'
import Select from './Select';
import Input from './Input';
import { useLoaderData } from 'react-router-dom';

export default function Notice() {
const notices = useLoaderData();

    const [option,setOption]=useState('All');
    const [data,setData]=useState(notices);
    const [term,setTerm]=useState('');
    // let data =notices;

  
    
  return (
    <div className="noticecont">
        <div className="notice">
        <h1>Notice</h1>
        <div class="search-filter-bar">
            
            <Input term={term} notices={notices} setTerm={setTerm} setData={setData} />
            <Select  notices={notices} setData={setData}setOption={setOption} option={option}/>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Notice Title</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {data.map(e=>(
                    <tr>
                    <td>{e.section}</td>
                    <td>{e.title}</td>
                    <td>{e.date}</td>
                    <td>{e.time}</td>
                </tr>
                ))}
                
               
            </tbody>
        </table>
        </div>
    </div>
  )
}
export async function noticeloader()
{
    var notices=await fetch('https://www.takshilabackend.somee.com/api/Notice/getall');
    notices=await notices.json();
    return notices;
}

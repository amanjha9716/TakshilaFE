import React from 'react'
import { PieChart } from '@mui/x-charts'
import './result.css'
import Feedback from './Feedback.jsx'
import { useLoaderData } from 'react-router-dom'

function Resultpage() {
  const { resdata, averagesArray,posdata } = useLoaderData();

  return (
    <div className="resultcont">
      <div className="resgrp">
        <p className='heading'>Quarter wise marks</p>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Quarter-1</th>
              <th>Quarter-2</th>
              <th>Quarter-3</th>
              <th>Quarter-4</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {resdata.map((e, index) => (
              <tr key={index}>
                <td>{e.key}</td>
                <td>{e.value.quarter1 || 'N/A'}</td>
                <td>{e.value.quarter2 || 'N/A'}</td>
                <td>{e.value.quarter3 || 'N/A'}</td>
                <td>{e.value.quarter4 || 'N/A'}</td>
                <td>{averagesArray[e.key]?.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <p className='heading'>Average subject wise marks</p>

        <PieChart
          series={[
            {
              data: Object.entries(averagesArray).map(([subject, average], id) => ({
                id,
                label: subject,
                value: average
              })),
              innerRadius: 30,
              outerRadius: 80,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
              cx: 150,
              cy: 100,
            },
          ]}
          width={400}
          height={250}
        />
      </div>
      <div className="pos">
        <h2>Student Performance Summary</h2>
        <div className="summary-component" style={{ width: "97%" }}>
          <ul>
        
              <li>
                <strong>Number of Tests Attempted:</strong> <span>{posdata.data[0].total}</span>
              </li>
              <li>
                <strong>Number of Tests Passed:</strong> <span>{posdata.data[0].pass}</span>
              </li>
              <li>
                <strong>Number of Tests Failed:</strong> <span>{posdata.data[0].fail}</span>
              </li>
              <li>
                <strong>Rank of Student:</strong> <span>{posdata.posi}</span>
              </li>
              <li>
                <strong>Weakest Subject:</strong> <span>Mathematics</span>
              </li>
            </ul>
         
        </div>
        <br />
        <h2>Teacher`s Feedback</h2>
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
      </div>
    </div>
  )
}

export default Resultpage;

export async function resultloader() {
  const itemStr = localStorage.getItem("userData");
  const item = JSON.parse(itemStr);
  const user = JSON.parse(item.value);

  let resdata = await fetch(`https://www.takshilabackend.somee.com/api/Results/getquarterlyresult?username=${user.username}`);
  var posdata=await fetch(`https://www.takshilabackend.somee.com/api/Results/position?username=${user.username}`);
  posdata = await posdata.json();

  resdata = await resdata.json();

  const averagesArray = {};

  resdata.forEach(subject => {
    const { value } = subject;
    const sum = Object.values(value).reduce((total, num) => total + (num || 0), 0);
    const count = Object.values(value).filter(num => num != null).length;
    const average = sum / count;
    averagesArray[subject.key] = average;
  });

  return { posdata,resdata, averagesArray };
}

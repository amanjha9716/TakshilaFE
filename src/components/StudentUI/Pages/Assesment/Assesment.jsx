import React, { useEffect, useState } from "react";
import "./assesment.css";
import { Link, useLoaderData } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import Assesmentcard from "./Assesmentcard";
export default function Assesment() {
  var { resdata, data: asses,posdata }=useLoaderData();



  return (
    <div className="assescont">
      <div className="asses">
        <p className="mainhead">Assesment Dashboard</p>
        <div className="upcass">
          <p>Upcoming Assesment</p>
          {asses.map(e=><Assesmentcard assename={e.assessename} date={e.expirydate}assesid={e.assesid} totalstud={e.totalstud}/>)}
          

        </div>
        <div className="comasses">
          <p>Completed Assesment</p>

          <table class="completed-quizzes">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>Marks Obtained</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {resdata.map(e=>(<tr>
                <td>{e.assessename}</td>
                <td>{e.expirydate}</td>
                <td>{e.marks}</td>
                {e.marks>50?<td>Pass</td>:<td>Fail</td>}
                
              </tr>))}
              
             
            </tbody>
          </table>
        </div>
      </div>
      <div className="righttab">
        <p
          style={{ paddingTop: "20px", paddingBottom: "0", marginLeft: 0 }}
          className="mainhead"
        >
          Student benchmark
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "50%",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <ReactSpeedometer
            width={300}
            height={180}
            needleHeightRatio={0.7}
        minValue={0}
        value={posdata.data[0].average*10}

            maxValue={1000}
            customSegmentStops={[0, 250, 750, 1000]}
            segmentColors={["orange", "#14ffec", "#00bbf0"]}
            currentValueText="Performance"
            customSegmentLabels={[
              {
                text: "poor",
                position: "OUTSIDE",
                color: "grey",
              },
              {
                text: "doing good",
                position: "OUTSIDE",
                color: "grey",
              },
              {
                text: "Awesome!",
                position: "OUTSIDE",
                color: "grey",
              },
            ]}
            ringWidth={45}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#a7ff83"}
            textColor={"#d8dee9"}
          />
          <div class="summary-component">
            <h2>Student Performance Summary</h2>
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
          <div class="summary-component">
            <h2>Best Performers</h2>
            <ul>
              <li>
                <strong>First Position:</strong> <span>Abhishek</span>
              </li>
              <li>
                <strong>Second Position:</strong> <span>Aman</span>
              </li>
              <li>
                <strong>Third position:</strong> <span>Aman</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function assesLoader()
{
  const itemStr = localStorage.getItem("userData");
  const item = JSON.parse(itemStr);
  const user= JSON.parse(item.value);
  var data=await fetch(`https://www.takshilabackend.somee.com/api/Assesment/recent 3?stan=${user.stand}`);
  var resdata=await fetch(`https://www.takshilabackend.somee.com/api/Results/get4result?username=${user.username}`);
  var posdata=await fetch(`https://www.takshilabackend.somee.com/api/Results/position?username=${user.username}`);

  data=await data.json();
  resdata=await resdata.json();
  posdata=await posdata.json();
  return {resdata,data,posdata};
}


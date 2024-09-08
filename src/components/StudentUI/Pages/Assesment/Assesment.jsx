import React from "react";
import "./assesment.css";
import { useQuery } from "@tanstack/react-query";
import ReactSpeedometer from "react-d3-speedometer";
import Assesmentcard from "./Assesmentcard";
import Loader from "../Loader";

// Fetch function for recent assessments
const fetchRecentAssessments = async ({ queryKey }) => {
  const [, user] = queryKey;
  const response = await fetch(`https://www.takshilabackend.somee.com/api/Assesment/recent 3?stan=${user.stand}`);
  if (!response.ok) {
    throw new Error('Error fetching recent assessments');
  }
  return response.json();
};

// Fetch function for result data
const fetchResultData = async ({ queryKey }) => {
  const [, user] = queryKey;
  const response = await fetch(`https://www.takshilabackend.somee.com/api/Results/get4result?username=${user.username}`);
  if (!response.ok) {
    throw new Error('Error fetching result data');
  }
  return response.json();
};

// Fetch function for position data
const fetchPositionData = async ({ queryKey }) => {
  const [, user] = queryKey;
  const response = await fetch(`https://www.takshilabackend.somee.com/api/Results/position?username=${user.username}`);
  if (!response.ok) {
    throw new Error('Error fetching position data');
  }
  return response.json();
};

export default function Assesment() {
  // Get user data from localStorage
  const itemStr = localStorage.getItem("userData");
  const item = JSON.parse(itemStr);
  const user = JSON.parse(item.value);

  // Use Tanstack Query to fetch recent assessments, result data, and position data
  const { data: asses = [], isLoading: assesLoading, error: assesError } = useQuery({
    queryKey: ['recentAssessments', user],
    queryFn: fetchRecentAssessments,
  });

  const { data: resdata = [], isLoading: resLoading, error: resError } = useQuery({
    queryKey: ['resultData', user],
    queryFn: fetchResultData,
  });

  const { data: posdata, isLoading: posLoading, error: posError } = useQuery({
    queryKey: ['positionData', user],
    queryFn: fetchPositionData,
  });

  

  if (assesError || resError || posError) {
    return <div>Error: {assesError?.message || resError?.message || posError?.message}</div>;
  }

  return (
    assesLoading || resLoading || posLoading?<Loader/>
    :
    <div className="assescont">
      <div className="asses">
        <p className="mainhead">Assesment Dashboard</p>
        <div className="upcass">
          <p>Upcoming Assesment</p>
          {asses.map((e) => (
            <Assesmentcard
              key={e.assesid}
              assename={e.assessename}
              date={e.expirydate}
              assesid={e.assesid}
              totalstud={e.totalstud}
            />
          ))}
        </div>
        <div className="comasses">
          <p>Completed Assesment</p>

          <table className="completed-quizzes">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>Marks Obtained</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {resdata.map((e) => (
                <tr key={e.assessename}>
                  <td>{e.assessename}</td>
                  <td>{e.expirydate}</td>
                  <td>{e.marks}</td>
                  <td>{e.marks > 50 ? "Pass" : "Fail"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="righttab">
        <p className="mainhead" style={{ paddingTop: "20px", paddingBottom: "0", marginLeft: 0 }}>
          Student benchmark
        </p>
        <div style={{ display: "flex", flexDirection: "column", height: "50%", alignItems: "center", padding: "10px" }}>
          <ReactSpeedometer
            width={300}
            height={180}
            needleHeightRatio={0.7}
            minValue={0}
            value={posdata?.data[0]?.average * 10 || 0}
            maxValue={1000}
            customSegmentStops={[0, 250, 750, 1000]}
            segmentColors={["orange", "#14ffec", "#00bbf0"]}
            currentValueText="Performance"
            customSegmentLabels={[
              { text: "poor", position: "OUTSIDE", color: "grey" },
              { text: "doing good", position: "OUTSIDE", color: "grey" },
              { text: "Awesome!", position: "OUTSIDE", color: "grey" },
            ]}
            ringWidth={45}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#a7ff83"}
            textColor={"#d8dee9"}
          />
          <div className="summary-component">
            <h2>Student Performance Summary</h2>
            <ul>
              <li>
                <strong>Number of Tests Attempted:</strong> <span>{posdata?.data[0]?.total}</span>
              </li>
              <li>
                <strong>Number of Tests Passed:</strong> <span>{posdata?.data[0]?.pass}</span>
              </li>
              <li>
                <strong>Number of Tests Failed:</strong> <span>{posdata?.data[0]?.fail}</span>
              </li>
              <li>
                <strong>Rank of Student:</strong> <span>{posdata?.posi}</span>
              </li>
              <li>
                <strong>Weakest Subject:</strong> <span>Mathematics</span>
              </li>
            </ul>
          </div>
          <div className="summary-component">
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

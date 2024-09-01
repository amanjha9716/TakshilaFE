import React from 'react'
import './attendance.css'
// import { PieChart,Pie,Legend,Cell } from 'recharts'
import { PieChart } from '@mui/x-charts'
import piechart from './piechart'
import Piechartcomp from './piechart'
import { Tooltip } from 'recharts'
import { green } from '@mui/material/colors'


export default function Attendance() {
  return (
    <div className="attencont">
      
      <div className="left">
      <p className='heading'>
          Overall attandence
        </p>

        <PieChart
  series={[
    {
      data: [
  
        { id:0,label: "Maths", value: 90 },
        { id:1,label: "Physics", value: 98 },
        { id:2,label: "chemistry", value: 95 },
        { id:3,label: "English", value: 97}

      ],
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
        <p className='heading'>
          Subject wise attandence
        </p>
        <table>
        <thead>
            <tr>
                <th>Subject</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Leave</th>
                <th>% of Present</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Mathematics</td>
                <td>40</td>
                <td>5</td>
                <td>3</td>
                <td>83.33%</td>
            </tr>
            <tr>
                <td>Science</td>
                <td>38</td>
                <td>6</td>
                <td>4</td>
                <td>79.17%</td>
            </tr>
            <tr>
                <td>History</td>
                <td>42</td>
                <td>3</td>
                <td>1</td>
                <td>91.30%</td>
            </tr>
            <tr>
                <td>Geography</td>
                <td>39</td>
                <td>4</td>
                <td>3</td>
                <td>86.67%</td>
            </tr>
            <tr>
                <td>English</td>
                <td>41</td>
                <td>5</td>
                <td>2</td>
                <td>87.23%</td>
            </tr>
        </tbody>
    </table>
        
      </div>
      <div className="right">
        <div className="policy">
          
      <h1>Our Leave Policy</h1>
        <p>Our leave policy is designed to accommodate students needing time off for various reasons. Please adhere to the following guidelines when requesting leave:</p>
        <h2>Types of Leave</h2>
        <ul>
            <li><strong>Personal Leave:</strong> Up to 5 days per semester for personal matters.</li>
            <li><strong>Sick Leave:</strong> Up to 7 days per semester with a valid medical certificate.</li>
            <li><strong>Emergency Leave:</strong> Up to 3 days per semester for urgent and unforeseen matters.</li>
            <li><strong>Other Leave:</strong> Special leave requests considered on a case-by-case basis.</li>
        </ul>
        
        </div>
        <div className="leaveform">

       
        <h1>Leave Application Form</h1>
        <span>Fill this form for leave:</span>
        <form>
            <div class="form-group" >
                <label for="student-name">Student Name:</label>
                <input type="text" id="student-name" name="student-name" required/>
            </div>
            <div class="form-group">
                <label for="parent-name">Parent/Guardian Name:</label>
                <input type="text" id="parent-name" name="parent-name" required/>
            </div>
            <div class="form-group">
                <label for="contact">Contact Number:</label>
                <input type="tel" id="contact" name="contact" required/>
            </div>
            <div class="form-group">
                <label for="leave-type">Type of Leave:</label>
                <select id="leave-type" name="leave-type" required>
                    <option value="">Select...</option>
                    <option value="personal">Personal Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="emergency">Emergency Leave</option>
                    <option value="other">Other Leave</option>
                </select>
            </div>
            <div class="form-group">
                <label for="start-date">Start Date:</label>
                <input type="date" id="start-date" name="start-date" required/>
            </div>
            <div class="form-group">
                <label for="end-date">End Date:</label>
                <input type="date" id="end-date" name="end-date" required/>
            </div>
            <div class="form-group" style={{width:'100%'}}>
                <label for="reason">Reason for Leave:</label>
                <textarea id="reason" name="reason" rows="2" style={{width:'100%',maxHeight:'50px'}}required></textarea>
            </div>
         
            <button type="submit">Submit Application</button>
        </form>
        </div>
        {/* <p class="note">* Note: Submission of the leave application does not guarantee approval. The tutor will review and approve based on the circumstances.</p> */}
    
      </div>
    </div>
  )
}

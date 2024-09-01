import React from 'react'
import { Link } from "react-router-dom";

export default function Assesmentcard({assename,date,totalstud,assesid}) {
    
  return (
    <div className="assesment">
            <img
              src="https://infinitylearn.com/surge/wp-content/uploads/2021/12/MicrosoftTeams-image-58.jpg"
              alt=""
              srcset=""
            />
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <span>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    margin: 0,
                    marginTop: "6px",
                  }}
                >
                  {assename}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    margin: 0,
                    color: "darkslategrey",
                    marginTop: "2px",
                  }}
                >
                  {date} | 10 AM
                </p>
              </span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    margin: 0,
                    width: "60%",
                  }}
                >
                  No of student's enrolled:{totalstud}
                </p>
                <Link to={`test/123`}>
                  Open <i class="fa-solid fa-circle-chevron-right"></i>
                </Link>
              </span>
            </div>
          </div>
  )
}

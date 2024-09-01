import React from 'react'
import { Link } from "react-router-dom";

export default function ResourceCard({resname,date,totalstud,link}) {
    
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
                  {resname}
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
                  No of Downloads:{totalstud}
                </p>
                <a href={link}>
                  Download <i class="fa-solid fa-circle-chevron-right"></i>
                </a>
              </span>
            </div>
          </div>
  )
}

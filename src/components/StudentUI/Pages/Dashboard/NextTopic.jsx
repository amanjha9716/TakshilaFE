import React from 'react'

export default function NextTopic({subject,date,completion}) {
  return (
    <div className="subject"style={{paddingLeft:'10px'}}>
    <p style={{ fontWeight: 'bold', fontSize: '12px', margin: 0 ,textTransform:'capitalize'}}>{subject}</p>
   <div style={{display:'flex',alignItems:'center'}}>
   <i class="fa-regular fa-calendar-days" style={{color:'#696969'}}></i> <p style={{fontSize:'10px',margin:'0'}}>{date}</p>
    </div> 
   <progress value={completion} max={100}>50%</progress>

</div>
  )
}

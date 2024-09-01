import React from 'react'

function Feedback() {
  return (
    <div className="feedback">
        <div className="teacher">
            <b>Abhishek Jha :</b>
            <p style={{color:"grey",fontWeight:'bold',fontSize:"12px" }}>Maths Subject</p>
        </div>
        <div className="review">
            he is performing well in Maths yet need to improve as he is not getting 100%
        </div>
    </div>
  )
}

export default Feedback
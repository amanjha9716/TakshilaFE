import React from 'react'
import './test.css'
export default function Result({ data, marks }) {
    return (
        <div className='result'>
            <div className="answerkey">
                <h1 style={{ width: '100%', textAlign: 'center', color: 'orange' }}>Answer Key</h1>
                {data.map((e, ind) =>
                    <div className="answer">
                        <p className='statement'> <b>Q{ind + 1}:{e.statement}</b></p>
                        <p className='qans'><b>Your ans:</b>:{marks.list[ind].selected}</p>
                        <p className='qans'><b>Correct Ans</b>:{e.answer}</p>

                    </div>
                )}
            </div>
            <div className="studperfom">
            <h1 style={{ width: '100%', textAlign: 'center', color: 'orange' }}>Students Performance Summery</h1>

<div className="report">
<div style={{display:'flex'}}>
<p style={{width:'fit-content'}}className='statement'>Maximum possible marks:</p><p style={{width:'fit-content'}} className='qans'>100</p> 

</div>
<div style={{display:'flex'}}>
<p style={{width:'fit-content'}}className='statement'>Marks obtained:</p><p style={{width:'fit-content'}} className='qans'>{marks.correct*5}</p> 

</div>
<div style={{display:'flex'}}>
<p style={{width:'fit-content'}}className='statement'>No of Correct Answer:</p><p style={{width:'fit-content'}} className='qans'>{marks.correct}</p> 

</div>
<div style={{display:'flex'}}>
<p style={{width:'fit-content'}}className='statement'>No of Incorrect Answer:</p><p style={{width:'fit-content'}} className='qans'>{marks.incorrect}</p> 

</div>

</div>

            </div>


        </div>
    )
}

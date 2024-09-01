import React from 'react'

export default function UpcEvent({ eventname, subject }) {
    return (
        <div className="event">
            <div style={{
                display: 'flex', margin: '10px', borderRadius: '5px', padding: '5px',
                backgroundColor: 'orange', width: '30px', height: '30px', color: 'white',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <i className="fa-solid fa-microscope"></i>
            </div>
            <div style={{paddingTop:'10px'}}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '0', textTransform: 'capitalize' }}>{eventname}</p>
                <p style={{ fontSize: '10px', color: 'grey', marginTop: '0', textTransform: 'capitalize' }}>{subject}</p>
            </div>
        </div>
    )
}

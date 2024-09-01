// import React from 'react'
import React, { PureComponent } from 'react';
import { BarChart,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts';

export default function Barchart({data}) {
  const subjects = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'name') : [];
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
  return (
                    
                <BarChart
                
            width={400}
            height={150}
            data={data}
            syncId="anyId"
            
          >
            <CartesianGrid stroke='3' />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip style={{backgroundColor:'grey'}} />
           
            {subjects.map(subject => (
                    <Bar key={subject} dataKey={subject} fill={getRandomColor()} />
                ))}

          </BarChart>

        //   </ResponsiveContainer>
  )
  
}

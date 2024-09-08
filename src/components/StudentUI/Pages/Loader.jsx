import React from 'react'
import { HashLoader } from 'react-spinners'
export default function Loader() {
    return <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}><HashLoader
    color="orange"
    size={80}
  />
  </div>
}

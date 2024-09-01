import React from 'react'

export default function Select({notices,setData,setOption,option}) {
    function filterCategory(e) {
        const selectedValue = e.target.value;
        setOption(selectedValue);
        setData(notices.filter(notice => selectedValue === 'All' || notice.section === selectedValue));
        
    }
  return (
    <>
    <select id="categoryFilter" onChange={(e)=>filterCategory(e)}  value={option}>
                <option value="All">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Events">Events</option>
                <option value="Admin">Admin</option>
                <option value="Placement">Placement</option>
            </select>
    </>
  )
}

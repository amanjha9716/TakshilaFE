import React, { useState } from 'react'

export default function Input({term,setTerm,notices,setData}) {
    const [suggestions,setSuggestions]=useState([]);
    // constc[data]
    function searchNotices(e)
    {
        setTerm(e.target.value);
        const t=e.target.value; 
            setSuggestions( notices.filter(notice=>notice.title.toLowerCase().includes(t.toLowerCase())));

            if(e.target.value==='')
            {
                setSuggestions([]);
            }
    }
    function handleSuggestionClick(suggestion)
    {
        setTerm(suggestion);
        setSuggestions([]);
    }
    function handlesearch()
    {
        setData(notices.filter(notice =>  notice.title === term));
        setTerm('');

    }
  return (
    <div>
    <input type="text" name='srcinput' id="searchInput" onChange={(e)=>searchNotices(e)} value={term} placeholder="Search notices..."/>
    <button onClick={handlesearch}>search</button>
    {suggestions.length > 0 && (
                <ul style={{
                    listStyleType: 'none', 
                    padding: 0, 
                    margin: 0, 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '300px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    position: 'absolute',
                    backgroundColor: 'white',
                    zIndex: 1
                }}>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleSuggestionClick(suggestion.title)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {suggestion.title}
                        </li>
                    ))}
                </ul>
    )}
    
    </div>
  )
}

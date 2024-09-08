import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import './test.css';
import Result from './Result.jsx';
import TestPanel from './TestPanel';
import { useQuery } from '@tanstack/react-query';
import Loader from '../StudentUI/Pages/Loader.jsx';

export default function Test() {
    const {testid}=useParams();
    // const {data,testid} = useLoaderData();
    const [marks, setMarks] = useState(null); // Initialize as null to check if marks are set
    const [isComplete, setIsComplete] = useState(false);
    const {data,isLoading,isError,Error}=useQuery({
        queryKey:['asses',testid],
        queryFn:()=>fetchData(`https://localhost:7167/api/Assesment/asses${testid}`)
    })
    useEffect(() => {
        if (isComplete && marks === null) {
            // Optionally handle case where `marks` is not set
            console.error('Marks are not set before completing the test.');
        }
    }, [isComplete, marks]);

    return (
        isLoading?<Loader/>:
        <div className="test-cont">
            <div className="test">
                {isComplete && marks ? (
                    <Result data={data} marks={marks} />
                ) : (
                    <TestPanel data={data} testid={testid} setMarks={setMarks} isComplete={isComplete} setIsComplete={setIsComplete} />
                )}
            </div>
        </div>
    );
}
async function fetchData(url)
{
    const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
}

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import QuesGrid from './QuesGrid';
import Question from './Question';
import Colorptr from './Colorptr';

export default function TestPanel({ data, setIsComplete, setMarks, isComplete,testid }) {
  const [quesind, setQues] = useState(0);

  // Memoize the initial anslist to prevent recreating on each render
  const initialAnsList = useMemo(() => {
    return Array(20).fill({ status: 'notvisited', correct: false });
  }, []);

  const [anslist, setansList] = useState(initialAnsList);
  const [displayTime, setDisplayTime] = useState('10:00');
  const timeLeftRef = useRef(600); // Set timer to 10 minutes (600 seconds)
    async function postResult(num)
    {
        const itemStr = localStorage.getItem("userData");
    const item = await JSON.parse(itemStr);
    let user=await  JSON.parse(item.value);
    await fetch("https://localhost:7167/api/Results/addresult", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    resultid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    username: user.username,
    assesid: testid,
    marks: num
  })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    
    }
  // Function to calculate the result
  const calculateResult = useCallback(() => {
    let correct = 0;
    let incorrect = 0;
    anslist.forEach(ans => {
      if (ans.correct) correct++;
      else incorrect++;
    });
    postResult(correct*5);
    setMarks({ correct, incorrect, list: anslist });
    
    console.log(correct, incorrect);
  }, [anslist, setMarks]);

  // Stop the timer when test is completed manually or by timeout
  useEffect(() => {
    if (isComplete) {
      calculateResult();
    }
  }, [isComplete, calculateResult]);

  // Timer logic
  const tick = useCallback(() => {
    if (timeLeftRef.current > 0 && !isComplete) {
      timeLeftRef.current -= 1;
      const minutes = Math.floor(timeLeftRef.current / 60);
      const seconds = timeLeftRef.current % 60;
      setDisplayTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    } else if (timeLeftRef.current === 0 && !isComplete) {
      setIsComplete(true); // Mark as complete when time runs out
    }
  }, [isComplete, setIsComplete]);

  // Start the timer effect
  useEffect(() => {
    if (!isComplete) {
      const timerId = setInterval(tick, 1000);
      return () => clearInterval(timerId); // Cleanup on unmount or completion
    }
  }, [tick, isComplete]);

  // Function to handle test completion manually
  const handleCompleteTest = () => {
    if (!isComplete) {
      setIsComplete(true); // Manually complete the test
    }
  };

  // Memoize setQues and setansList to avoid unnecessary renders
  const handleSetQues = useCallback((index) => {
    setQues(index);
  }, []);

  const handleSetAnsList = useCallback((newList) => {
    setansList(newList);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div className="studinfo">
        <span><b>Subject</b>: {data[0].subject}</span>
        <span><b>Maximum marks</b>: 100</span>
        <span style={{ display: 'flex', width: 'fit-content', flexDirection: 'column', textAlign: 'center' }}>
          <b>Timer:</b>
          <p>{displayTime}</p> {/* Display formatted time */}
        </span>
        <span>Abhishek Jha</span>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        {isComplete ? (
          <div className="completion-message">
            <h1>Test Completed</h1>
            {/* Optionally display the result or redirect */}
          </div>
        ) : (
          <>
            <div className="testinfo">
              <QuesGrid no={20} setQues={handleSetQues} quesind={quesind} anslist={anslist} />
   <progress value={(quesind+1)*5} max={100} style={{width:'100%'}}>50%</progress>
              
              <Colorptr />
            </div>
            <div className="quescont">
              <Question
                key={quesind}
                ques={data[quesind]}
                option={data[quesind].options}
                length={data.length}
                isComplete={isComplete}
                anslist={anslist}
                setQues={handleSetQues}
                quesind={quesind}
                setansList={handleSetAnsList}
                setIsComplete={setIsComplete}
              />
            </div>
          </>
        )}
      </div>
      {!isComplete && <button onClick={handleCompleteTest}>Submit Test</button>} {/* Only show the submit button if test is not completed */}
    </div>
  );
}

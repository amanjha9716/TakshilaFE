import React, { useState } from 'react';

export default function Question({ ques, length, option, quesind, setQues, anslist, setansList, setIsComplete }) {
  const [ans, setAns] = useState(""); // State for storing the selected answer

  // Handle selection by clicking on an option
  function handleSelect(selectedOption) {
    setAns(selectedOption); // Update the selected answer

  }

  // Handle flagging the question
  function handleFlag() {
    setansList(prev => {
      const newAnsList = [...prev];
      newAnsList[quesind] = {
        status: 'flag',
        correct: false,
        selected: ''
      };
      return newAnsList;
    });
    setQues(quesind + 1); // Move to the next question
  }

  function handlePrev() {
    setQues(quesind - 1); // Move to the previous question
  }

  function handleSubmit() {
    console.log(anslist);
    const confirm = window.confirm("Do You Want to Submit the test?");
    if (confirm) {
      const isCorrect = ques.answer === ans;
      setansList(prev => {
        const newAnsList = [...prev];
        newAnsList[quesind] = {
          status: 'attempted',
          correct: isCorrect,
          selected: ans
        };
        return newAnsList;
      });
      setIsComplete(true); // Mark test as complete
    }
  }

  // Handle submitting the answer
  function handleNext() {
    const isCorrect = ques.answer === ans; // Check if the selected answer is correct

    setansList(prev => {
      const newAnsList = [...prev];
      newAnsList[quesind] = {
        status: 'attempted',
        correct: isCorrect,
        selected: ans
      };
      return newAnsList;
    });

    setQues(quesind + 1); // Move to the next question or submit the test
  }

  return (
    <div className='question'>
      <div className="quesstat">
        <h1>Ques {quesind + 1}: {ques.statement}</h1>

        {/* Map through options and make each one clickable */}
        {option.map((e, key) => (
          <div
            key={key}
            className={`option ${anslist[quesind].selected === e ? 'selected' : ''}`} // Add 'selected' class if chosen
            onClick={() => handleSelect(e)} // Handle click to select option
            style={{
              padding: '10px',
              margin: '5px',
              border: '1px solid #ccc',
              backgroundColor: ans === e ? '#d1e7dd' : '#f8f9fa', // Change background color when selected
              cursor: 'pointer',
              border: ans === e ? '2px solid orange' : ''
            }}
          >
            {e}
          </div>
        ))}
      </div>

      <div className="testbtn">
        {/* Conditionally render the button label based on whether it's the last question */}
        {length === quesind + 1 ?
          <button onClick={handleSubmit}>Submit Test</button> :
          <button onClick={handleNext}>Next Question</button>
        }
        <button onClick={handleFlag}>Flag</button> {/* Button to flag the question */}
        {quesind > 0 && <button onClick={handlePrev}>Previous Question</button>} {/* Button to go to the previous question */}
      </div>
    </div>
  );
}

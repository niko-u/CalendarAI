import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EventPage = () => {
  const location = useLocation();
  const responses = location.state.responses || [];
  const [parsedResponses, setParsedResponses] = useState([]);
  const [classNames, setClassNames] = useState([]);
  const [previousResponses, setPreviousResponses] = useState([]);
  const navigate = useNavigate();
  const [deletedRow, setDeletedRow] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);


  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let isCancelled = false;

    const handleChange = async () => {
      await timeout(1000);

      if (!isCancelled) {
        parseResponses();
      }
    }

    handleChange();

    return () => {
      isCancelled = true;
    };
  }, [responses]);

  useEffect(() => {
    if (highlightedRow !== null && parsedResponses.length > highlightedRow) {
      setHighlightedRow(null); // Remove the highlight
    }
  }, [parsedResponses]);


  const parseResponses = () => {
    const newParsedResponses = [];
    const newClassName = []; // New array for classNames

    for (let i = 0; i < responses.length; i++) {
        const currResponses = [];
  
        for (let j = 0; j < responses[i].length; j++) {
            if (j == 0) {
                newClassName.push(responses[i][j])
            }
            const response = responses[i][j];
            const parsedResponse = {
                date: response.date,
                time: response.time,
                event: response.event,
            };
            currResponses.push(parsedResponse);
        }
        newParsedResponses.push(currResponses); // Use spread operator to push individual parsed responses to the new array
    }
    setParsedResponses((prevState) => [...prevState, ...newParsedResponses]);
    setClassNames((prevState) => [...prevState, ...newClassName]); // Set the new classNames array
  };
  
  
//   const handleUndo = () => {
//     if (deletedRow) {
//       setParsedResponses((prevState) => [deletedRow, ...prevState]);
//       setDeletedRow(null);
//     }
//   };

const handleUndo = () => {
    if (deletedRow) {
      setParsedResponses((prevState) => {
        const updatedResponses = [...prevState];
        updatedResponses.splice(currentIndex, 0, deletedRow);
        setDeletedRow(null);
        return updatedResponses;
      });
    }
  };
  
  
  

  const handleAddEvent = () => {
    const newEvent = { date: 'yyyy-mm-dd', event: 'Event title or description here' };
  
    setParsedResponses((prevState) => {
      const updatedResponses = [...prevState];
      updatedResponses[currentIndex] = [newEvent, ...updatedResponses[currentIndex]];
      return updatedResponses;
    });
  
    setHighlightedRow(0); // Highlight the newly added row at index 0
  
    // Delay the reset of the highlighted row after 1 second
    setTimeout(() => {
      setHighlightedRow(0); // Reset the highlighted row after 1 second
    }, 1);
  };
  
  
  
  

  const handleLeftButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setHighlightedRow(null); // Remove the highlight
  };
  
  const handleRightButtonClick = () => {
    if (currentIndex < parsedResponses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setHighlightedRow(null); // Remove the highlight
  };
  
  

  const handleInputChange = (e, index, key) => {
    const value = e.target.value;
    setParsedResponses((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };


  const handleDeleteEvent = (index) => {
    setParsedResponses((prevState) => {
      const updatedResponses = [...prevState];
      updatedResponses[currentIndex] = updatedResponses[currentIndex].filter(
        (_, i) => i !== index
      );
      return updatedResponses;
    });
  };
  


  

  const handleAddToCalendar = () => {
    const filteredResponses = parsedResponses.map((parsedResponse) =>
      parsedResponse.filter((response) => response.date && response.time && response.event)
    );
  
    navigate('/output', {
      state: {
        eventData: filteredResponses,
        eventNames: classNames,
      },
    });
  };
  


  

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center bg-gray-900 bg-cover bg-no-repeat" id='root'>
        <div className="absolute inset-0 bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`, filter: 'blur(8px)', WebkitFilter: 'blur(8px)'}} />
  
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 md:px-20 py-8 md:py-16 shadow-lg backdrop-blur-md mx-4 md:mx-auto h-[70vh] md:w-3/4 flex flex-col md:flex-row justify-center items-center">
            <button
            onClick={handleLeftButtonClick}
            className={`bg-blue-400 bg-opacity-70 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-70 hover:bg-blue-500'} text-white font-medium py-2 px-4 rounded-lg focus:outline-none rounded-full w-16 h-16`}
            style={{ marginRight: '1rem' }}
            disabled={currentIndex === 0} // Disable if index is 0
            >
            <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
          <div className="w-full md:w-5/6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleUndo} className="bg-red-500 bg-opacity-60 hover:bg-red-600 hover:bg-opacity-60 text-white font-medium py-1 px-3 rounded-lg focus:outline-none hover:scale-105 transition-all ease-out duration-200">Undo</button>

              <div className="flex items-center justify-center w-auto text-center">
                <input
                    type="text"
                    value={classNames[currentIndex]?.className || ''}
                    onChange={(e) => {}}
                    className="bg-red-500 bg-opacity-60 text-white p-4 rounded-xl text-center w-full text-center"
                />
            </div>




              <button onClick={handleAddEvent} className="bg-red-500 bg-opacity-60 hover:bg-red-600 hover:bg-opacity-60 text-white font-medium py-1 px-3 rounded-lg focus:outline-none hover:scale-105 transition-all ease-out duration-200">Add Event</button>
            </div>
            <div className="flex items-center justify-center">
              <div className="max-h-[50vh] overflow-y-auto w-full"> {/* Added w-full to make the table take full width */}
                <table className="border-collapse w-full">
                  <thead className="sticky top-0 bg-red-500 bg-opacity-50">
                    <tr>
                      <th className="py-2 px-4 text-gray-100 font-medium w-[20%]">Date</th>
                      <th className="py-2 px-4 text-gray-100 font-medium w-[20%]">Time</th>
                      <th className="py-2 px-4 text-gray-100 font-medium">Event</th>
                      <th className="py-2 px-4 text-gray-100 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {parsedResponses && parsedResponses[currentIndex] && parsedResponses[currentIndex].map((parsedResponse, index) => (
                    parsedResponse.date && parsedResponse.event ? (
                    <tr
                        key={index}
                        className={highlightedRow === index ? 'bg-red-400' : (index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-700')}
                    >
                        <td className="py-2 px-4 w-[20%]">
                        <input
                            type="text"
                            value={parsedResponse.date}
                            onChange={(e) => handleInputChange(e, index, 'date')}
                            className="bg-transparent w-full outline-none text-gray-100 mt-1 mb-1 focus:ring-1 focus:ring-red-500 focus:text-red-500 focus:text-opacity-70 focus:ring-offset-opacity-50"
                        />
                        </td>
                        <td className="py-2 px-4 w-[20%]">
                        <input
                            type="text"
                            value={parsedResponse.time}
                            onChange={(e) => handleInputChange(e, index, 'time')}
                            className="bg-transparent w-full outline-none text-gray-100 mt-1 mb-1 focus:ring-1 focus:ring-red-500 focus:text-red-500 focus:text-opacity-70 focus:ring-offset-opacity-50"
                        />
                        </td>
                        <td className="py-2 px-4">
                        <input
                            type="text"
                            value={parsedResponse.event}
                            onChange={(e) => handleInputChange(e, index, 'event')}
                            className="bg-transparent w-full outline-none text-gray-100 mt-1 mb-1 focus:ring-1 focus:ring-red-500 focus:text-red-500 focus:text-opacity-70 focus:ring-offset-opacity-50"
                        />
                        </td>
                        <td className="py-2 px-4 flex items-center justify-center">
                        <button
                            onClick={() => handleDeleteEvent(index)}
                            className="text-red-500 text-opacity-60 font-medium hover:text-red-700 focus:outline-none mt-1 mb-1"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </button>
                        </td>
                    </tr>
                    ) : null
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleAddToCalendar} className="bg-blue-400 bg-opacity-70 hover:bg-opacity-70 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none hover:scale-105 transition-all ease-out duration-200">Add To Calendar</button>
            </div>
          </div>
          <button
            onClick={handleRightButtonClick}
            className={`bg-blue-400 bg-opacity-70 ${currentIndex === parsedResponses.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-70 hover:bg-blue-500'} text-white font-medium py-2 px-4 rounded-lg focus:outline-none rounded-full w-16 h-16`}
            style={{ marginLeft: '1rem' }}
            disabled={currentIndex === parsedResponses.length - 1} // Disable if index is the max length
            >
            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </button>
        </div>
      </div>
    </Layout>
  );
  
  
  
};

export default EventPage;

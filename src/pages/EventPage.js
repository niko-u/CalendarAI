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
  const [previousResponses, setPreviousResponses] = useState([]);
  const navigate = useNavigate();
  const [deletedRow, setDeletedRow] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(-1);


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
  }, []);

  useEffect(() => {
    if (highlightedRow !== null && parsedResponses.length > highlightedRow) {
      setHighlightedRow(null); // Remove the highlight
    }
  }, [parsedResponses]);

  const parseResponses = () => {
    const flattenedResponses = responses.flat();
  
    const parsedResponses = [];
    for (let i = 0; i < flattenedResponses.length; i++) {
      const response = flattenedResponses[i];
      const parsedResponse = {
        date: response.date,
        event: response.event,
      };
      parsedResponses.push(parsedResponse);
    }
  
    console.log('Responses:', responses);
    console.log('Parsed Responses:', parsedResponses);
  
    setParsedResponses(parsedResponses);
  };
  
  const handleUndo = () => {
    if (deletedRow) {
      setParsedResponses((prevState) => [deletedRow, ...prevState]);
      setDeletedRow(null);
    }
  };

  const handleAddEvent = () => {
    const newEvent = { date: 'yyyy-mm-dd', event: 'Event title or description here' };
    setParsedResponses((prevState) => [newEvent, ...prevState]);
    setHighlightedRow(0); // Highlight the newly added row at index 0

        // Delay the reset of the highlighted row after 1 second
        setTimeout(() => {
            setHighlightedRow(0); // Reset the highlighted row after 1 second
          }, 1);
  };
  
  
  

  const handleLeftButtonClick = () => {
    // Handle left button click event
    console.log("Left button clicked");
  };

  const handleRightButtonClick = () => {
    // Handle right button click event
    console.log("Right button clicked");
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
    const deletedRow = parsedResponses[index];
    setParsedResponses((prevState) =>
      prevState.filter((item, i) => i !== index)
    );
    setDeletedRow(deletedRow);
  };

  const handleAddToCalendar = () => {
    const calendarData = parsedResponses.map((parsedResponse) => ({
      date: parsedResponse.date,
      event: parsedResponse.event,
    }));
  
    const jsonData = JSON.stringify(calendarData);
    console.log(jsonData);
  };
  

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center bg-gray-900 bg-cover bg-no-repeat" id='root'>
        <div className="absolute inset-0 bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`, filter: 'blur(8px)', WebkitFilter: 'blur(8px)'}} />
  
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 md:px-20 py-8 md:py-16 shadow-lg backdrop-blur-md mx-4 md:mx-auto h-[70vh] md:w-3/4 flex flex-col md:flex-row justify-center items-center">
        <button onClick={handleLeftButtonClick} className="bg-blue-400 bg-opacity-70 hover:bg-opacity-70 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none rounded-full w-16 h-16" style={{marginRight: '1rem'}}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></button>
          <div className="w-full md:w-5/6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleUndo} className="bg-red-500 bg-opacity-60 hover:bg-red-600 hover:bg-opacity-60 text-white font-medium py-1 px-3 rounded-lg focus:outline-none">Undo</button>
              <button onClick={handleAddEvent} className="bg-red-500 bg-opacity-60 hover:bg-red-600 hover:bg-opacity-60 text-white font-medium py-1 px-3 rounded-lg focus:outline-none">Add Event</button>
            </div>
            <div className="flex items-center justify-center">
              <div className="max-h-[50vh] overflow-y-auto w-full"> {/* Added w-full to make the table take full width */}
                <table className="border-collapse w-full">
                  <thead className="sticky top-0 bg-red-500 bg-opacity-50">
                    <tr>
                      <th className="py-2 px-4 text-gray-100 font-medium w-[20%]">Date</th>
                      <th className="py-2 px-4 text-gray-100 font-medium">Event</th>
                      <th className="py-2 px-4 text-gray-100 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedResponses.map((parsedResponse, index) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleAddToCalendar} className="bg-blue-400 bg-opacity-70 hover:bg-opacity-70 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">Add To Calendar</button>
            </div>
          </div>
          <button onClick={handleRightButtonClick} className="bg-blue-400 bg-opacity-70 hover:bg-opacity-70 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg focus:outline-none rounded-full w-16 h-16" style={{marginLeft: '1rem'}}><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></button>

        </div>
      </div>
    </Layout>
  );
  
  
  
};

export default EventPage;

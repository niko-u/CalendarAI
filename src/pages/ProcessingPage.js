import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { handlePDFSend } from '../services/services';
import { useLocation } from "react-router-dom";

const ProcessingPage = () => {
  const location = useLocation();
  const selectedFiles = location.state.files || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [responses, setResponses] = useState([]);

  const navigate = useNavigate();

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
        await timeout(1000);

        if (!isCancelled) {
            processFiles()
        }
    }

    handleChange()

    return () => {
        isCancelled = true;
    };
  }, []);

  const processFiles = async () => {

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setCurrentFile(file.name);

      try {
        // Process the file here
        const prompt = "Find all important dates and their titles";
        const response = await handlePDFSend(file, prompt);

        // Store the response in the array
        setResponses((prevResponses) => [...prevResponses, response]);
        // Perform further processing or display of the response data
      } catch (error) {
        console.error('Error:', error);
        // Handle any errors that occur during the API request
      }

      setCurrentIndex(i + 1);
      setCurrentFile(null);
    }

    // Redirect to the next page with the responses
    navigate('/events', { responses });
  };

  const progress = (currentIndex / selectedFiles.length) * 100;

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'blur(8px)',
            WebkitFilter: 'blur(8px)', // For Safari support
          }}
        />

        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 md:px-20 py-8 md:py-16 shadow-lg backdrop-blur-md mx-4 md:mx-auto h-[70vh] md:w-3/4 flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-5/6">
            <div className="text-white text-center text-2xl font-bold mt-4">
              Processing: {currentFile}
            </div>
            <div className="relative w-full h-2 bg-gray-600 mt-4">
              <div
                className="absolute top-0 left-0 h-2 bg-red-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-white text-lg text-center mt-4">
              Files Processed: {currentIndex} / {selectedFiles.length}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessingPage;

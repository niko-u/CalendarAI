import React, { useState, useRef } from 'react';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { handlePDFSend } from '../services/services';
import { useNavigate } from 'react-router-dom';

function AppPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isNavigationInProgress, setIsNavigationInProgress] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    processSelectedFiles(files);
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = () => {
    const files = fileInputRef.current.files;
    processSelectedFiles(files);
  };

  const handleDragExit = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const processSelectedFiles = (files) => {
    const newSelectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        newSelectedFiles.push(file);
      }
    }

    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
  };

// ...

const processAllFiles = async () => {
    // Navigate to the loading page
    if (selectedFiles.length > 0) {
      console.log(selectedFiles)
      navigate('/processing', {
         state: {
            files: selectedFiles
         } 
        });
    } else {
      console.log("Please upload a PDF");
    }
  };
  
  

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelectedFiles = [...prevSelectedFiles];
      updatedSelectedFiles.splice(index, 1);
      return updatedSelectedFiles;
    });
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

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
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="w-12 h-12" />
              <h1 className="text-white text-3xl font-bold ml-2">CalendarAI</h1>
            </div>
            <div id="movethis" className="">
              <div className="flex justify-between">
                <p className="text-white mt-8">Upload up to 10 syllabi simultaneously</p>
                <button className="bg-red-500 text-white px-3 py-2 rounded-lg mt-2 bg-opacity-50 mr-2 hover:scale-105 transition-all ease-out duration-200"
                onClick={processAllFiles}>
                  Process Files
                </button>
              </div>
              <button
                className={`mt-3 border-dashed border-2 rounded-lg p-4 w-full h-80 flex justify-center items-center transition-all ease-out duration-200 ${
                  isDragOver ? 'bg-red-500 bg-opacity-50' : 'border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDragExit={handleDragExit}
                onClick={handleClick}
              >
                <span
                  className={`cursor-pointer text-white text-center ${
                    isDragOver ? 'text-opacity-50' : ''
                  }`}
                >
                  {selectedFiles.length > 0 ? 'Drag and drop or click to select files' : 'Drag and drop or click to select files'}
                </span>
                <input
                  id="fileInput"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileInputChange}
                  multiple
                  accept=".pdf"
                />
              </button>

              <div className="mt-4">
                <p className="text-white">Selected PDFs:</p>
                {selectedFiles.map((file, index) => (
                  <button
                    key={index}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg mt-2 opacity-50 mr-2 hover:scale-105 transition-all ease-out duration-200"
                    onClick={() => handleRemoveFile(index)}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AppPage;

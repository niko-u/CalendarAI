import React, { useState, useRef } from 'react';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';

function AppPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    processSelectedFiles(files);
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

        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-10 md:px-20 py-8 md:py-16 shadow-lg backdrop-blur-md mx-4 md:mx-auto h-[80vh] md:w-3/4 flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-5/6">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="w-12 h-12" />
              <h1 className="text-white text-3xl font-bold ml-2">CalendarAI</h1>
            </div>
            <div id='movethis' className=''>
              <p className="text-white mt-8">Upload up to 10 syllabi simultaneously</p>
              <div
                className={`mt-3 border-dashed border-2 rounded-lg p-4 h-80 flex justify-center items-center ${
                  isDragOver ? 'bg-red-500 bg-opacity-50' : 'border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <label
                  htmlFor="fileInput"
                  className={`cursor-pointer text-white text-center ${isDragOver ? 'text-opacity-50' : ''}`}
                >
                  {selectedFiles.length > 0 ? 'Files Selected' : 'Drag and drop or click to select files'}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileInputChange}
                  multiple
                  accept=".pdf"
                />
              </div>
              <div className="mt-4">
                <p className="text-white">Selected PDFs:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <p className="text-white">{file.name}</p>
                  </div>
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

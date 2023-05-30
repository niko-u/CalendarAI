import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { handlePDFSend } from '../services/services';

const EventPage = (props) => {
  const selectedFiles = props;

  const [responses, setResponses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  }, []);



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

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;

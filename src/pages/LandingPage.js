import React from 'react';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';

function LandingPage() {

  return (
    <Layout>
      <div>
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
            <div className="text-center md:text-left mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-8xl font-bold text-white mb-4">CalendarAI</h1>
              <p className="text-white text-lg mb-6">
                CalendarAI is an AI-powered solution that revolutionizes calendar management. CalendarAI seamlessly
                integrates with your syllabus and automatically populates your calendar with essential due dates and
                important events. Say goodbye to the hassle of manually adding deadlines and hello to a streamlined
                scheduling experience.
              </p>
              <div className="space-x-4">
                <a
                  href="/signup"
                  className="inline-block px-6 py-3 text-white bg-red-500 bg-opacity-50 rounded-3xl hover:scale-105 transition-all ease-out duration-200"
                >
                  Sign Up
                </a>
                <a
                  href="/signin"
                  className="inline-block px-6 py-3 text-white bg-red-500 bg-opacity-50 rounded-3xl hover:scale-105 transition-all ease-out duration-200"
                >
                  Sign In
                </a>
              </div>
            </div>
            <div className="w-3/4 mt-10 md:mt-0">
              <img src={Logo} alt="" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;

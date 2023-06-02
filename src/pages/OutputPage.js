import React, { useEffect } from 'react';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { useLocation } from 'react-router-dom';

const OutputPage = () => {
  const location = useLocation();
  const eventData = location.state.eventData || [];

  useEffect(() => {
    // Sample JSON data
    const jsonData = eventData[0];

    // Create an empty .ics file
    let icsFileContent = `BEGIN:VCALENDAR
    VERSION:2.0
    CALSCALE:GREGORIAN
    METHOD:PUBLISH
    `;

    // Iterate through each object in the JSON data
    jsonData.forEach((event) => {
      const { date, event: description } = event;
      const formattedDate = new Date(date).toISOString().replace(/[-:.]/g, '');
        const formattedDateTime = formattedDate.substring(0, 15) + '0000';

      // Format the date in the required format (YYYYMMDD)
    //   const formattedDate = new Date(date)
    //     .toISOString()
    //     .replace(/[-:.]/g, '')
    //     .split('T')[0];

      // Format the event details
      const eventContent = `BEGIN:VEVENT
      UID:${formattedDateTime}@your-website.com
      DTSTAMP:${formattedDateTime}
      SUMMARY:${description}
      DTSTART;VALUE=DATE:${formattedDate}
      DTEND;VALUE=DATE:${formattedDate}
      END:VEVENT
      `;

      // Add the event details to the .ics file
      icsFileContent += eventContent;
    });

    // Add closing statements to the .ics file
    icsFileContent += 'END:VCALENDAR';

    // Generate the .ics file and initiate the download
    const fileName = 'events.ics';
    const blob = new Blob([icsFileContent], { type: 'text/calendar' });

    const downloadICS = () => {
      if (window.navigator.msSaveOrOpenBlob) {
        // For Internet Explorer
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // For other browsers
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      }
    };

    downloadICS();
  }, [eventData]);

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
                <p className="text-white mt-8">
                  Download the attached .ics file and add to your personal calendar
                </p>
              </div>
              <button
                className={`mt-3 border-dashed border-2 rounded-lg p-4 w-full h-80 flex justify-center items-center transition-all ease-out duration-200 `}
              >
                <span className={`cursor-pointer text-white text-center `}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OutputPage;

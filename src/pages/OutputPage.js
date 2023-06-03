import React, { useEffect } from 'react';
import Layout from '../layouts/mainLayout';
import backgroundImage from '../media/nn2.gif';
import Logo from '../media/logo2.png';
import { useLocation } from 'react-router-dom';

const OutputPage = () => {
  const location = useLocation();
  const data = location.state.eventData || [];

  useEffect(() => {
    // Sample JSON data

    // Create an empty .ics file
    // let icsFileContent = `BEGIN:VCALENDAR
    // VERSION:2.0
    // CALSCALE:GREGORIAN
    // METHOD:PUBLISH
    // `;
    let icsFileContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nPRODID:CALENDARAI//EN\r\n`;


    console.log("class data: ", data)

    // Iterate through each object in the JSON data
    data.forEach((classData) => {
        classData.forEach((event) => {
            const { date, time, event: description } = event;
            const formattedDateTime = new Date(`${date}T${time}`).toISOString().replace(/[-:.Z]/g, "").substring(0, 15);
            const dstamp = new Date(`${date}T00:00:00`).toISOString().replace(/[-:.Z]/g, "").substring(0, 15);            
            console.log(formattedDateTime)
            // Format the event details
            const eventContent = `BEGIN:VEVENT\r\nUID:${description}\r\nDTSTAMP:${dstamp}\r\nSUMMARY:${description}\r\nDTSTART:${formattedDateTime}\r\nDTEND:${formattedDateTime}\r\nEND:VEVENT\r\n`;

            // Add the event details to the .ics file
            icsFileContent += eventContent

        })
      


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
  }, [data]);

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

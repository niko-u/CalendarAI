import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/userContext';

import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import NotFoundPage from './pages/NotFoundPage';
import AppPage from './pages/AppPage';
import ProcessingPage from './pages/ProcessingPage';
import EventPage from './pages/EventPage';
import OutputPage from './pages/OutputPage';

import PrivateRoutes from './utils/privateRoutes';
import PublicRoutes from './utils/publicRoutes';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route element={<AppPage />} path='/app' exact />
              <Route element={<ProcessingPage />} path='/processing' exact />
              <Route element={<EventPage />} path='/events' exact />
              <Route element={<OutputPage />} path='/output' exact />
          </Route>
          <Route element={<PublicRoutes />}>
              <Route element={<SigninPage />} path='/signin' exact />
              <Route element={<SignupPage />} path='/signup' exact />
              <Route element={<LandingPage />} path='/' exact />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
     </UserContext.Provider>
  );
}

export default App;

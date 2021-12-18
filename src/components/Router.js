import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter =  ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
         ) : (
          <>
            <Route path="/" element={<Auth />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
         )}
      </Routes>
    </Router>
  );
}

export default AppRouter;

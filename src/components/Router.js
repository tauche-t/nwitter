import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter =  ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div style={{maxWidth: 890, width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center"}}>

        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={
                  <Home userObj={userObj} />
              } />
              <Route path="/profile" element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />}></Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;

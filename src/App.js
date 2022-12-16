import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import my components.
import Login from "./components/Login/Login";
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';
import NavbarBrand from './components/NotificationsBar/NavbarBrand';

// Import Bootstrap components.
import Container from "react-bootstrap/Container";

// Import Context.
import { UserContext } from './context/UserContext.js';


function App() {

  const [ user, setUser ] = useState();

  return (
    
    <UserContext.Provider value={[user, setUser]}>
      <Container className="App d-flex-column justify-content-center p-0" fluid>
        <NavbarBrand />

        <BrowserRouter basename='/'>
          <Routes>

            <Route path="/" 
              element = {
                <Login 
                />
              }
            />
              
            <Route
              exact
              path='/sign-up'
              element = {
                <SignUp />
              }
            />

            <Route 
              exact
              path='/:id/profile'
              element = {
                <Profile 
                />
              }
            /> 

            <Route
              exact
              path='/:id/visit/:friend_id'
              element = {
                <Profile 
                />
              }
            />

          </Routes>
        </BrowserRouter>
      </Container>
    </UserContext.Provider>
  );
}

export default App;

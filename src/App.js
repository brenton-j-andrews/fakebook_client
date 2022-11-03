import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import my components.
import Login from "./components/Pages/Login";
import SignUp from './components/Pages/SignUp';
import Profile from './components/Pages/Profile';

// Import Bootstrap components.
import Container from "react-bootstrap/Container";

function App() {

  return (

    <Container className="App d-flex justify-content-center mt-2">

      <BrowserRouter basename='/'>

        <Routes>

          <Route 
            exact
            path="/"
            element= {
              <Login />
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
            path='/user/profile'
            element = {
              <Profile />
            }
          /> 

        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

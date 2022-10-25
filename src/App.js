import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import my components.
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  return (
    <main className="App">
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
    </main>
  );
}

export default App;

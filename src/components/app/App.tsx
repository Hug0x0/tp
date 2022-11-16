import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Tp coinpaprika
        </p>
        <NavLink className="nav-link" to="/about">
          A propos
        </NavLink>
      </header>
    </div>
  );
}

export default App;
